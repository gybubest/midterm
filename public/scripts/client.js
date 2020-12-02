/*
 * Client-side logic
 * jQuery is already loaded
 */


$(document).ready(() => {
  // Form mandatory fields validation
  $('form.create-poll').validate({
    rules: {
        inputEmail: {
            required: true,
            email: true
        },
        inputNewQuestion: {
          required: true,
        },
        inputOpt1: {
          required: true,
        },
        inputOpt2: {
          required: true,
        },
    }
  });

  $('form.create-poll input').on('keyup blur', () => {
      if ($('form.create-poll').valid()) {
          $('button.newPollSubmitButton').prop('disabled', false);
      } else {
          $('button.newPollSubmitButton').prop('disabled', 'disabled');
      }
  });

});

const copy = (selector) => {
  var $temp = $("<div>");
  $("body").append($temp);
  $temp.attr("contenteditable", true)
      .html($(selector).html()).select()
      .on("focus", function() { document.execCommand('selectAll',false,null); })
      .focus();
  document.execCommand("copy");
  $temp.remove();
};
