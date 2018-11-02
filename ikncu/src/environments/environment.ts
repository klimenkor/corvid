// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'dev',
  apiHost: 'ap2x0k2ppb.execute-api.us-east-1.amazonaws.com/prod/',
  ssl: true,

  region: 'us-east-1',

  identityPoolId: 'us-east-1:782bd3b6-d761-4bf7-ac25-02a8ea4ee035',
  userPoolId: 'us-east-1_3Kv91pd2A',
  clientId: '3vcvfetpd0e0v0gp21aovkg8re',
  rekognitionBucket: 'corvid-frames',
  albumName: '',
  bucketRegion: 'us-east-1',

  ddbTableName: 'logintrail',

  cognito_idp_endpoint: '',
  cognito_identity_endpoint: '',
  sts_endpoint: 'http://localhost:4200',
  dynamodb_endpoint: '',
  s3_endpoint: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
