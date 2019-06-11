# nodeAcademyFinalTest
Practice all of the concepts learn during the node academy by building a restful api

# How to start

Run the following command after cloning the repo

```sh
$ npm install
```

## Setup

This app connects to a MySQL database to manage all of its resources, to connect to your database you'll need to provide a **.env** file with the following variables:

```bash
DB_HOST='localhost'
DB_USER='your_db_user'
DB_PASSWORD='your_db_user_password'
DB_NAME='your_db_name'
```

You'll need to install MySQL in your machine and set up a database to connect to.

# Development server

Run the development server with the following command

```sh
$ npm run dev
```

The server will recieve request on localhost:3000

# Run test

To run all test

```sh
$ npm run test
```

To see all test coverage
```sh
$ npm run test:coverage
```

# Test it wit Postman

Import the requests collection into postman located in /postman/request.json
Or using this link https://www.getpostman.com/collections/61639f774267204df576