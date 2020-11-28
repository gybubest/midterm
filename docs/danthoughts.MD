## NODE + EXPRESS - runs RESTFUL routes.

GET / - home page
GET /new - poll creation
POST / - create a poll
GET /:id - go to poll with this ID
POST /:id - submit poll response
GET /my/:id - show poll results

## DATABASE - stores info

things to store:

- POLLS (many) -
title
email address of creator
admin link -
user link - both hashed random generated sequences BUT SEPARATE
array of options? (2-5)

- RESULTS (many)
result submissions - can you store an array? gets around the variable number of responses issue

- USERS? possibly optional
session ID
associated polls
associated replies

## FRONT END
jquery or EJS?
seems to be a requirement to use jquery in our stack
SEE diagram
