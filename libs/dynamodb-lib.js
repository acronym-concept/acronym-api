import AWS from 'aws-sdk';

const { IS_OFFLINE } = process.env;
let dynamoDB;

// connect to local DB if running offline
if (IS_OFFLINE === 'true') {
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
  console.log('DynamoDB: Connected to localhost on port 8000');
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDB;
