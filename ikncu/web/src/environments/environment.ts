// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  envName: 'dev',
  apiHost: 'https://1hlgfthw33.execute-api.us-east-1.amazonaws.com/Stage',
  ssl: true,

  region: 'us-east-1',
  s3url: 'https://s3.amazonaws.com/',
  identityPoolId: 'us-east-1:1aaa072e-635b-43b6-90c8-ffc8985bea4d',
  userPoolId: 'us-east-1_2UAv3TYR1',
  clientId: '3j892k1a89fc3672050jcs0hqm',
  framesBucket: 'ikncu-frames',
  facesBucket: 'ikncu-faces',
  albumName: '',
  bucketRegion: 'us-east-1',

  ddbTableName: 'logintrail',

  cognito_idp_endpoint:  '',
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
