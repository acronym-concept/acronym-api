const uuid = require('uuid');
const DynamoDB = require('../libs/dynamodb-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.createCart = (event, context, callback) => {
  const data = JSON.parse(event.body);

  // quick validation
  if (typeof data.username !== 'string') {
    console.error('Error: validation failed');
    callback(null, failure('Validation failed: Couldn\'t add user.'));
    return;
  }

  const params = {
    TableName: process.env.CART_TABLE,
    Item: {
      cartId: uuid.v1(),
      userId: data.username,
    },
  };

  DynamoDB.put(params, (error) => {
    if (error) {
      console.error('Error:', error.message);
      callback(null, failure('Server error: Could not create user.'));
    }

    // create a response
    callback(null, success(params.Item));
  });
};
