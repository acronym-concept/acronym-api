const DynamoDB = require('../libs/dynamodb-lib');

module.exports.byId = (event, context, callback) => {
  const user = event.pathParameters;
  if (typeof user.id !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Validation failed: Couldn\'t add user.',
    });
    return;
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      userId: user.id,
    },
  };

  DynamoDB.get(params, (error, data) => {
    if (error) {
      console.error('Error:', error.message);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Server error: Could not get user.',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
    callback(null, response);
  });
};
