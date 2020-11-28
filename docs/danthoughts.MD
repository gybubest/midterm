## NODE + EXPRESS - runs RESTFUL routes.

GET / - home page (poll creation)
POST / - create a poll
GET /:id - go to poll with this ID
POST /:id+params - submit poll response
DELETE /:id - remove a poll
PUT /:id - update a poll (optional)
GET /results/:id - show poll results

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
LOGIC -
 - poll options pulled from database
 - represented as in-memory objects
 - has text, and also position as key
 - onclick/drag changes objects position values
 - poll data submitted to BD could be as simple as an array of 2-5 integers, where each integer represents the poll option and the order represents their ranking.

## STRETCH!
- mail out to respondents.
- cookies for persistent sessions
