### (Brief) Getting Started Hints

Prerequisites: Yarn

1. Start a MongoDB instance. The [official Mongo Docker image](https://hub.docker.com/_/mongo/) is a quick way to get up and running. Add an empty database (named, for example, 'hangman').

2. Extract the SOWPODS.json.zip in HangmanServer/server/resources and import some words into the database via [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/):
```
mongoimport --db hangman --collection words --jsonArray --drop --file HangmanServer/server/resources/SOWPODS.json
```

3. Add a .env file in the root of the server directory with values for:

    - AUTH_SECRET=\<secret for signing/verifying json web tokens goes here e.g. not-so-secret-auth-secret \>

    - DB_CONNECTION_STRING=\<mongodb connection string goes here e.g. mongodb://localhost/hangman />
    
    - HANGMAN_CLIENT_URL=http://localhost:3000
    
    - SWAGGER_CONFIG=./local.api.yml

4. Add a .env file in the root of the client directory with:

    - REACT_APP_API_URL=http://localhost:3005

5. Run `yarn install` and `yarn start` in both the client and server directories
