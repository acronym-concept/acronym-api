const uuid = require('uuid');
const DynamoDB = require('../libs/dynamodb-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.user = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // quick validation
  if (typeof data.username !== 'string') {
    console.error('Error: validation failed');
    callback(null, failure('Validation failed: Couldn\'t add user.'));
    return;
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Item: {
      userId: uuid.v1(),
      username: data.username,
      age: data.age,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  DynamoDB.put(params, (error) => {
    if (error) {
      console.error('Error:', error.message);
      callback(null, failure('Server error: Could not create user.'));
      return;
    }

    // create a response
    callback(null, success(params.Item));
  });
};
