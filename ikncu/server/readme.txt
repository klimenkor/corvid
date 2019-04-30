sam package --template-file template.yml --s3-bucket ikncu-deploy --output-template-file package.yml;sam deploy --template-file package.yml --stack-name ikncu --capabilities CAPABILITY_IAM --s3-bucket ikncu-deploy

aws cloudformation describe-stacks --query 'Stacks[0].[Outputs[].[OutputKey,OutputValue]]|[]' --output json --stack-name ikncu-dev > arnKeys.json

https://www.freeformatter.com/json-escape.html




aws cognito-idp list-users --user-pool-id us-east-1_2UAv3TYR1
====> ikncu-6dc8a55b-7b6a-4b66-80ab-2d1098c08705

aws rekognition list-collections
aws rekognition list-faces --collection-id ikncu-6dc8a55b-7b6a-4b66-80ab-2d1098c08705
aws rekognition list-faces --collection-id ikncu-6dc8a55b-7b6a-4b66-80ab-2d1098c08705


aws rekognition delete-collection --collection-id ikncu-6dc8a55b-7b6a-4b66-80ab-2d1098c08705

