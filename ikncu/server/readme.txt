sam package --template-file template.yml --s3-bucket ikncu-deploy --output-template-file package.yml;sam deploy --template-file package.yml --stack-name ikncu --capabilities CAPABILITY_IAM

aws cloudformation describe-stacks --query 'Stacks[0].[Outputs[].[OutputKey,OutputValue]]|[]' --output json --stack-name ikncu-dev > arnKeys.json

https://www.freeformatter.com/json-escape.html