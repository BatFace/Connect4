# Hangman

A hangman game server and some sample bots to communicate with it.

## Endpoint Descriptions

### /auth

|Verb|Path|Requires token|Description|
|----------|----------|---------|----------|
|POST|/|false|Register a new user account. Returns an auth token ([JSON web token](https://en.wikipedia.org/wiki/JSON_Web_Token))
|POST|/login|false|Returns a new auth token if the credentials provided correspond to an existing account
|GET|/me|true|Returns a description of the current user

### /users

|Verb|Path|Requires token|Description|
|----------|----------|---------|----------|
|GET|/|false|Returns a list of all registered users
|GET|?full=true|false|Returns a list of all registered users + their current game

### /games

|Verb|Path|Requires token|Description|
|----------|----------|---------|----------|
|POST|/|true|Creates a new game
|PATCH|/current|true|Play a turn of the current game. Returns the state of the game after that move has been played if successful
|GET|/current|true|Returns a single game object representing the current game
|GET|/:id|true|Returns a single game object (if the current user has a game with that ID)

