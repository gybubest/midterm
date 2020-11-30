## Libraries we can use

1. EmailJS send email to creator
https://www.emailjs.com
Compared with MailGun has a three-month free trial, but Emaijs is completely free if send up to 200 emails per month.

2. Shopify or jQuery drag-and-drop options
Demo on this page. Several sortable lists:
https://shopify.github.io/draggable/examples/simple-list.html

Github repo:
https://github.com/Shopify/draggable

OR jQuery Draggable Widget
https://jqueryui.com/sortable/

3. Chart.js for results display
Main page:
https://www.chartjs.org/samples/latest/

Bar chart example:
https://www.chartjs.org/docs/latest/charts/bar.html

## Choose frameworks
Node.js Express server;
jQuery Ajax for drag-and-drop, ongoing results afterwards(stretch)

## Database (based on ./danthoughts)
- POLLS -
id
question
email address of creator
admin link -
user link - both hashed random generated sequences BUT SEPARATE

- OPTIONS -
id
title
optional description
timestamp
poll_id

- RESPONSES -
id
voter_name
timestamp
poll_id

- RESPONSES_OPTIONS -
id
response_id
option_id
poll_id
weighting


## Features
/Database - schema/
1. Create table POLLS
2. Create table OPTIONS
3. Create table RESPONSES
4. Create table RESPONSES_OPTIONS

/Backend - routes of pages/
1. GET / - home page
2. GET /new - poll creation
3. POST / - create a poll
4. After submit (show links)
5. GET /:id - go to poll with this ID
6. POST /:id - submit poll response
7. GET /my/:id - show poll results (admin page)

/Backend - ajax (drag-and-drop)/

/Backend - email/

/Frontend - html/
1. index.ejs
2. header.ejs and other partials (not sure)?
3. new.ejs
4. id.ejs (each poll page)
5. show.ejs (results)

/Frontend - css/
1. global settings (background, background-color, font, font-color, display)
2. forms
3. buttons
4. bar charts
5. minimum change of layout for desktop version

### Milestone ###
# Day 1 Sat
1. Database schema
2. Server setup
3. GET / - home page route
4. index.ejs

# Day 2 Mon
/Feature/
1. GET /new - poll creation
2. new.ejs
* a user can create a poll with multiple choices
* each choice can have a title and optional description
* the creator must enter an email

/Feature/
3. POST / - create a poll
4. sql script
5. random hashed link generator
6. Backend - email
* when a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
* the links are also sent to the creator via email

/Feature/
7. GET /:id - go to poll with this ID
8. id.ejs (each poll page)
* when a user visits the submission link, they enter their name if required and see a list of the choices for that poll

/Feature/
9. POST /:id - submit poll response
10. sql script
11. After submit page
* each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results)

# Day 3 Tue
/Feature/
1. Backend - ajax (drag-and-drop)
* the user can rank the choices (by drag and drop or some other method) and then submits the poll

/Feature/
2. GET /my/:id - show poll results (admin page)
3. show.ejs (results)
* the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count

/Feature/
4. CSS global settings (background, background-color, font, font-color, display)
5. CSS each page

# Day 4 Wed

1. continue CSS
2. unfinished features or debugging
3. git merge MVP version

# Day 5 Thu
Stretch features

# Day 6 Fri
Demo day
