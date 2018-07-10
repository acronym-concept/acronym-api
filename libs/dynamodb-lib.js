import AWS from 'aws-sdk';

require('dotenv').config();

const { IS_OFFLINE } = process.env;
let dynamoDb;

// connect to local DB if running offline
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
  console.log('PROCESS.ENV :', process.env);
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDb;
