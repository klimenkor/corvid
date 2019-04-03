// aws cloudformation describe-stacks --query 'Stacks[0].[Outputs[].[OutputKey,OutputValue]]|[]' --output json --stack-name ikncu-dev 
// NOTE: the output saved in UCS-2 LE BOM 
// it has to be converted into UTF-8/ANSI

let arns = new Map(
    [
        [
            "MotionDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-MotionTable-1NCQALS59OW8A"
        ],
        [
            "TierDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-TierTable-1JHBOG2S1QMXD"
        ],
        [
            "CategoryDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-CategoryTable-178EDJW7OEMT4"
        ],
        [
            "CameraDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-CameraTable-GZ4SHXIGI18E"
        ],
        [
            "FaceDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-FaceTable-1LAU3G4XLFXFZ"
        ],
        [
            "UserDynamoDbARN",
            "arn:aws:dynamodb:us-east-1:558796877616:table/ikncu-UserTable-DBK49LM4E1H9"
        ]
    ]
);

function getArn(name) {
    return arns.get(name);
}

function getName(name) {
    return getArn(name).split('/')[1];
}

exports.getArn = getArn;
exports.getName = getName;
