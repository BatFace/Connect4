### (Brief) Getting Started Hints

Prerequisites: Yarn

1. Start a MongoDB instance. The [official Mongo Docker image](https://hub.docker.com/_/mongo/) is a quick way to get up and running.

2. Add a .env file in the root of the server directory with values for:

    - AUTH_SECRET=\<secret for signing/verifying json web tokens goes here e.g. not-so-secret-auth-secret \>

    - DB_CONNECTION_STRING=\<mongodb connection string goes here e.g. mongodb://localhost/hangman />

3. Run `yarn install` and `yarn start` in both the client and server directories
