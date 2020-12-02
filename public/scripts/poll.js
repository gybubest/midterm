const $ = require( "jquery" );



$(document).ready( () => {


    $( function() {
      $( "#sortable" ).sortable();
      $( "#sortable" ).disableSelection();
    });


    $( "#submitOrder" ).on("click"( () => {
      const voter_name = validateText($( "#name" ).val());
      if (!anonymous && !voter_name) {
        $("#error-msg").show(200);
        setTimeout(() => $("#error-msg").hide(200), 3600);
      } else {
        // generates weightings for options based on their order in list
        const weightings = generateWeightings($( "#sortable" ).sortable( "serialize", { key: "option" } ).split("&"))
        $.ajax(`/${userLink}`, {
        method: "POST",
        data: {
          poll_id: pollID,
          name: voter_name,
          responses: weightings }
        })
        .then( (res) => {
          if (res === "Poll submitted successfully!") {
            window.location.assign("/");
          }
        });
      }
    }))


});
