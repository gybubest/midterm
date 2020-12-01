const express = require('express');
const router  = express.Router({ mergeParams: true });

//BUGS: sometimes only options will be presented without a question.

module.exports = (db) => {
  // returns an object with single instance of the poll question and each option linked to the poll
  router.get("/", (req, res) => {
    const poll = {};
    db.query(`
    SELECT question
    FROM polls
    WHERE polls.user_link = $1;
    `, [req.params.id])
    .then(data => {
      console.log(data.rows)
      poll.question = data.rows[0].question;
    })
    .then(
    db.query(`
    SELECT options.id, title, description
    FROM options
    JOIN polls ON polls.id = poll_id
    WHERE polls.user_link = $1;`, [req.params.id])
      .then(data => {
        poll.options = data.rows;
        console.log(poll.options);
        res.render("poll", {poll})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }));

  });

  router.post("/", (req, res) => {

    // query 1 - INSERTS a new RESPONSE
    // RETURNING Response_id

    // QUERY 2 - INSERTS a bunch of RESPONSE OPTION (poll_id, option_id, response_id, weighting)

  });

  return router;
};
