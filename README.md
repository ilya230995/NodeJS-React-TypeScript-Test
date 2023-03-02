# Start the project


## Backend

```
Go to Backend folder and run a command npm run dev
```
## Frontend

```
Go to Frontend folder and run a command npm run start
```

# API

Base url: http://localhost:5050/api/v1


## Auth


> Register

POST `/auth/register/`
```
body: {
    email: email@email.com,
    password: password,
}

password must contain upper- and lowercase letters, symbol and number
```
> Login

POST `/users/login/`
```
body: {
    email: email@email.com,
    password: password
}
```

## Products


> Add product 

POST `/products/add/`

```
body: {
    "name": "Product name", *
    "category": "Product category", *
    "price": 5, * 
    "description": "Product description", *
    "imageUrl": "Product image"
}

* reuired fields
```

> Get all products

GET `/products/?name=name&category=category`

Query name and category not necessary. Needs for searching by query

> Get product by id

GET `/products/{id}`

> Delete room 

DELETE `/products/{id}`

> Update product 

PUT `/products/{id}`

```
body: {
    "name": "name",
    "description": "description"
}
```

## Users


> Get curret user data

GET `/users/me/`

# Run the tests


## Backend

```
Go to Backend folder and run a command npm run test
```
## Frontend

```
Go to Frontend folder and run a command npm run test-jest
```
