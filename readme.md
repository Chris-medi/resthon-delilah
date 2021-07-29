# _API Delilah reston_
***
This is a api to restaurant, this project has token validation for some actions also has validation of rols . this api use a database, you can create a user, login and create a order with the avilable products 

## Table of contents
1. [Technologies](#technologies)
2. [Installation](#installation)

### Technologies
A list of technologies used within the project:
* [Node ](https://nodejs.org/es/blog/release/v14.0.0/): Version 14
* [npm ](https://www.npmjs.com/): Version 6.14
* [Express](https://expressjs.com/es/): Versio 4.17
* [mysql](https://www.mysql.com/)

### Installation

the project is deploy so you don't need install nothing.
You can use the project with the next url:

```
 https://delilah-reston.herokuapp.com
```

### how to use

 you can read the documentation of the api, what is in this repository

### OR

 * you can try it, you doing a request with a method **GET** to this **URL** ```https://delilah-reston.herokuapp.com/api/products```

* you get this response 

```json
    {
        "message": 'all products available',
        "data": [
            {
            "id": 1,
            "link_imagen": "hhtp//link-imagen",
            "name": "hamburguesa",
            "price": 8000
            }
        ]
    }
 ```


