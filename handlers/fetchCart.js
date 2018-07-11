const DynamoDB = require('../libs/dynamodb-lib');
const { success, failure } = require('../libs/response-lib');

module.exports.fetchItems = (event, context, callback) => {
  const { cartId } = event.pathParameters;
  console.log(event);

  // if (typeof user.cognitoIdentityId !== 'string') {
  //   console.error('Error: validation failed');
  //   callback(null, failure('Validation failed: Could not fetch cart'));
  // }

  const params = {
    TableName: 'shopping-cart',
    Key: {
      cartId,
    },
  };

  DynamoDB.get(params, (error, response) => {
    if (error) {
      console.error('Error:', error.message);
      callback(null, failure('Server error: could not fetch cart'));
    }

    callback(null, success(response));
  });
};
