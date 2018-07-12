import AWS from 'aws-sdk';

let DynamoDB;

if (process.env.IS_OFFLINE === 'true') {
  DynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
} else {
  DynamoDB = new AWS.DynamoDB.DocumentClient();
}

module.exports = DynamoDB;
