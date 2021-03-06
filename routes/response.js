const express = require('express');
const router  = express.Router({ mergeParams: true });
const { sendlinks } = require("../lib/helpers");

module.exports = (db) => {
  // supplied with '/:id' parameters from server.js mergeParams
  router.get("/", (req, res) => {

    Promise.all ([
    // Selects single instance data from DB
    db.query(`
    SELECT question, id AS poll_id, anonymous
    FROM polls
    WHERE polls.user_link = $1;
    `, [req.params.id]),
    // Selects multi instance data from DB
    db.query(`
    SELECT options.id, title, description
    FROM options
    JOIN polls ON polls.id = poll_id
    WHERE polls.user_link = $1;`, [req.params.id])
    ])
    .then( ([pollQ, options]) => {
      // populates poll object with query data
      const poll = {
        user_link : req.params.id,
        question : pollQ.rows[0].question,
        poll_id : pollQ.rows[0].poll_id,
        anonymous : pollQ.rows[0].anonymous,
        options : options.rows
      }
      // passes poll object to views engine
      res.render("poll", {poll})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  router.post("/", (req, res) => {
    // takes variables from poll response
    console.log(req.body);
    const pollID = req.body.poll_id;
    const name = req.body.name;
    const optionResponses = req.body.responses;
    // creates poll response instance
    db.query(`
    INSERT INTO responses (poll_id, voter_name)
    VALUES ($1, $2)
    RETURNING id AS response_id
    `, [pollID, name])
    .then(res => {
      const responseID = res.rows[0].response_id;
      // builds a query for a variable number of option responses
      // maybe better to perform one query per option?
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
      return db.query(queryString)
      })
      .then( () => {
        res.send("Poll submitted successfully!");

      // performs DB query to get creator email
        return db.query(`
        SELECT *
        FROM polls
        WHERE id = $1;
        `, [pollID]);
      })
      .then( (info) => {
    // generates and sends creator an email notifying them their poll has been responded to
        const infoForEmail = {
          question : info.rows[0].question,
          email : info.rows[0].email,
          admin_link : info.rows[0].admin_link,
          user_link : info.rows[0].user_link,
        };
        const subject = "Someone has responded to your poll!";
        return sendlinks(process.env.EMAIL, process.env.PASSWORD, infoForEmail.email, subject, infoForEmail.question, infoForEmail.admin_link, infoForEmail.user_link )
      })
      .catch(err => {
      console.log(err);
    })
  });

  return router;
};
