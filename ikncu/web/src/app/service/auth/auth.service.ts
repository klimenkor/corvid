import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { DynamoDBService } from './ddb.service';
import { CognitoCallback, CognitoUtil, LoggedInCallback } from './cognito.service';
import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import * as STS from 'aws-sdk/clients/sts';
import { ICognitoUser } from 'src/app/model/_index';

@Injectable()
export class AuthService {

    public CognitoUser = {
      id: '',
      name: '',
      email: '',
      jwtToken: ''
    } as ICognitoUser;

    constructor(public ddb: DynamoDBService, public cognitoUtil: CognitoUtil) {
    }

    private onLoginSuccess = (callback: CognitoCallback, session: CognitoUserSession) => {

        console.log('In authenticateUser onSuccess callback');

        AWS.config.credentials = this.cognitoUtil.buildCognitoCreds(session.getIdToken().getJwtToken());

        // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
        // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
        // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
        // security credentials. The identity is then injected directly into the credentials object.
        // If the first SDK call we make wants to use our IdentityID, we have a
        // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
        // very innocuous API call that forces this behavior.
        const clientParams: any = {};
        if (environment.sts_endpoint) {
            clientParams.endpoint = environment.sts_endpoint;
        }
        const sts = new STS(clientParams);
        sts.getCallerIdentity(
          (err: any, data: any) => {
            console.log('UserLoginService: Successfully set the AWS credentials');
            callback.cognitoCallback(null, session);
        });
    }

    private onLoginError = (callback: CognitoCallback, err: { message: string; }) => {
        callback.cognitoCallback(err.message, null);
    }

    authenticate(username: string, password: string, callback: CognitoCallback) {
        console.log('UserLoginService: starting the authentication');

        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        console.log('UserLoginService: Params set...Authenticating the user');
        const cognitoUser = new CognitoUser(userData);
        console.log('UserLoginService: config is ' + AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: (userAttributes, requiredAttributes) =>
              callback.cognitoCallback(`User needs to set password.`, null),
            onSuccess: result => this.onLoginSuccess(callback, result),
            onFailure: err => this.onLoginError(callback, err),
            mfaRequired: (challengeName, challengeParameters) => {
                callback.handleMFAStep(challengeName, challengeParameters,
                    (confirmationCode: string) => {
                      cognitoUser.sendMFACode(confirmationCode, {
                          onSuccess: result => this.onLoginSuccess(callback, result),
                          onFailure: err => this.onLoginError(callback, err)
                      });
                });
            }
        });
    }

    forgotPassword(username: string, callback: CognitoCallback) {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: () => {

            },
            onFailure: (err) => {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
        const userData = {
            Username: email,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess: () => {
                callback.cognitoCallback(null, null);
            },
            onFailure: (err) => {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    logout() {
        console.log('UserLoginService: Logging out');
        this.ddb.writeLogEntry('logout');
        this.cognitoUtil.getCurrentUser().signOut();

    }

    isAuthenticated(callback: LoggedInCallback) {
        if (callback == null) {
            throw new Error(('UserLoginService: Callback in isAuthenticated() cannot be null'));
        }

        const cognitoUser = this.cognitoUtil.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    console.log('UserLoginService: Couldn\'t get the session: ' + err, err.stack);
                    callback.isLoggedIn(err, false);
                } else {
                    const token = session.getIdToken();
                    this.CognitoUser = {
                          id: token.payload.sub,
                          name: token.payload.nickname,
                          email: token.payload.email,
                          jwtToken: token.jwtToken
                        } as ICognitoUser;

                    callback.isLoggedIn(err, session.isValid());
                }
            });
        } else {
            console.log('UserLoginService: can\'t retrieve the current user');
            callback.isLoggedIn('Can\'t retrieve the CurrentUser', false);
        }
    }
}
