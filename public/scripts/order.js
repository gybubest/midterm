// LOGIC FOR RENDERING POLLS

// query database

// SELECT polls.question
// FROM polls
// WHERE polls.user_link = [submitted_url

// render this at top of page

// SELECT options.id, options.title, options.description
// FROM options
// JOIN polls ON polls.id = poll_id
// WHERE polls.user_link = [submitted_url, this should be in values];

// THEN
// for each row in response
// make a draggable box in target FORM/container. id = poll_[options.id] (this is important for serialize). Title and description are displayed on box.
// CSS styling - boxes grow to fill space

// LOGIC FOR SUBMIT BUTTON
// form submission

$( document ).ready(function () {

  $( "bigBox" ).sortable({
    axis: 'y',
    stop: function (event, ui) {
      let order = $( "bigBox" ).sortable('serialize').toString();
      console.log(order);
    }
  })

});
