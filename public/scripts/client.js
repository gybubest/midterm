/*
 * Client-side logic
 * jQuery is already loaded
 */

$(document).ready(() => {
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

  $('form.create-poll input').on('keyup blur', function () {
      if ($('form.create-poll').valid()) {
          $('button.newPollSubmitButton').prop('disabled', false);
      } else {
          $('button.newPollSubmitButton').prop('disabled', 'disabled');
      }
  });

});
