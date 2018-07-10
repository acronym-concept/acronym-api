'use strict';

const AWS = require('aws-sdk');
const IS_OFFLINE = process.env.IS_OFFLINE;

let dynamoDb;

// connect to local DB if running offline
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log('client', dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

module.exports = dynamoDb;