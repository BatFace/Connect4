# API Primer

## API?

Application Programming Interface. A set of -- ideally! -- clearly defined methods and tools which allow consumers to act upon or communicate with the application/server which has that API. In the case of this Hangman server, that API HTTP-based.

## HTTP?

Hypertext Transfer Protocol, a message-based standard for making requests over the web.

An HTTP request has four parts (of which only 1 and 3 are mandatory):

1. A Request Line: The method (also known as the verb) -- GET, POST, PUT etc. + the URL + the version of the HTTP protocol being used
2. Headers: Extra information relating to the request or response e.g. Message body metadata, authentication tokens
3. A Blank Line: A CRLF pair (\r\n)
4. A Request Body: Used in POST requests (for example) to send content to the server

For communication with this HTTP-based API, you need to be able to:
1. Construct HTTP requests
2. Set the header "x-access-token" with an authentication token for those requests that require a token
3. Set a JSON-formatted request body for POST and PATCH requests (along with a "Content-Type" header of "application/json")

## JSON?

JavaScript Object Notation -- derived from JavaScript, now language-independent. A data format for transmitting key-value or array data structures. Its basic data types are:

- string
- number
- boolean
- array
- object
- null

An example relevant to this API is the request body required to create a user account:
```
{
    "username": "Example",
    "password": "soseekret"
}
```
