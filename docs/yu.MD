# Libraries we can use

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

# Choose frameworks
Node.js Express server;
jQuery Ajax for drag-and-drop, ongoing results afterwards(stretch)

# Database (based on ./danthoughts)
- POLLS -
id
title
email address of creator
admin link -
user link - both hashed random generated sequences BUT SEPARATE

- OPTIONS -
id
option_description
init_position (if needed for drag-and-drop)
poll_id

- RESPONSES -
id
voter_name
poll_id

- RESPONSES_OPTIONS -
id
response_id
option_id
poll_id
position
ranking_score DEFAULT 0 ()


- RESULTS -
id
final_position
final_score
array response_id (to show preferences by voter_name)
option_id
poll_id

# Features

# Milestone

# Email function
