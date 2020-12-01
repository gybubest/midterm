const express = require('express');
const router  = express.Router({ mergeParams: true });

//BUGS: sometimes only options will be presented without a question.

module.exports = (db) => {
  // returns an object with single instance of the poll question and each option linked to the poll
  router.get("/", (req, res) => {
    const poll = {};
    db.query(`
    SELECT question, id AS poll_id
    FROM polls
    WHERE polls.user_link = $1;
    `, [req.params.id])
    .then(data => {
      console.log(data.rows)
      poll.user_link = req.params.id;
      poll.question = data.rows[0].question;
      poll.poll_id = data.rows[0].poll_id
    })
    .then(
    db.query(`
    SELECT options.id, title, description
    FROM options
    JOIN polls ON polls.id = poll_id
    WHERE polls.user_link = $1;`, [req.params.id])
      .then(data => {
        poll.options = data.rows;
        // console.log(poll.options);
        res.render("poll", {poll})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }));

  });

  router.post("/", (req, res) => {
    const pollID = req.body.poll_id;
    const name = req.body.name;
    const optionResponses = req.body.responses;
    db.query(`
    INSERT INTO responses (poll_id, voter_name)
    VALUES ($1, $2)
    RETURNING id AS response_id
     `, [pollID, name])
     .then(res => {
       const responseID = res.rows[0].response_id;
       optionResponses.forEach(weighting => console.log(weighting, responseID))
       let queryString = `INSERT INTO response_options (poll_id,option_id,response_id,display_order,weighting) VALUES`
       for (let i = 0; i < optionResponses.length; i++) {
        const optionID = optionResponses[i][0];
        const weighting = optionResponses[i][1];
        queryString += `(${pollID}, ${optionID}, ${responseID}, 0, ${weighting})`;
        if (i < optionResponses.length -1) {
          queryString += `,`;
        }
       }

       queryString += `;`
       db.query(queryString)
       .then(console.log("you did it again"));
     })
     .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
    // const responses =
    console.log(req.body)
    // query 1 - INSERTS a new RESPONSE
    // RETURNING Response_id

    // QUERY 2 - INSERTS a bunch of RESPONSE OPTION (poll_id, option_id, response_id, weighting)

  });

  return router;
};
