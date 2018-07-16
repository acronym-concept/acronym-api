# Serverless API

## How to develop
```bash
npm install
serverless dynamodb install
serverless offline start
```

## DynamoDB talbe migration - for local dev
```bash
serverless dynamodb migrate
```

## Endpoints
- app
  - GET /
- createUser
  - POST /users
    - payload: {
		username
    	}
- getUser
	- GET /users/:id
	- payload: {
		id
		}
- addItemToCart
	- PUT /users/car/add/:id
	- payload: {
		id,
		itemId,
		type
		}