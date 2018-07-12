const DynamoDB = require('../libs/dynamodb-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.byId = (event, context, callback) => {
  const user = event.pathParameters;

  // quick validation
  if (typeof user.id !== 'string') {
    console.error('Error: validation failed');
    callback(null, failure('Validation failed: Couldn\'t fetch user.'));
    return;
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      userId: user.id,
    },
  };

  DynamoDB.get(params, (error, response) => {
    if (error) {
      console.error('Error:', error.message);
      callback(null, failure('Server error: Could not get user.'));
      return;
    }

    // create response
    callback(null, success(response));
  });
};
