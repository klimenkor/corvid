aws cloudformation create-stack --stack-name ikncu --template-body file://backend/deploy.json --parameters file://backend/parameters.json --capabilities CAPABILITY_NAMED_IAM
