const DynamoDB = require('../libs/dynamodb-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.addItem = (event, context, callback) => {
  const user = event.pathParameters;
  const { item } = (JSON.parse(event.body));

  if (typeof user.id !== 'string') {
    console.error('Error: validation failed');
    callback(null, failure('Validation failed: Could not put item to cart'));
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      userId: user.id,
    },
    UpdateExpression: 'SET #cart = list_append(#cart, :cart)',
    ExpressionAttributeNames: {
      '#cart': 'cart',
    },
    ExpressionAttributeValues: {
      ':cart': [{
        itemId: item.id ? item.id : null,
        type: item.type ? item.type : null,
      }],
    },
    ReturnValues: 'ALL_NEW',
  };

  DynamoDB.update(params, (error, response) => {
    if (error) {
      console.error('Error:', error.message);
      callback(null, failure('Server error: could not put item to cart'));
    }

    callback(null, success(response));
  });
};
