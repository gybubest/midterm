const express = require('express');
const router  = express.Router({ mergeParams: true });
// const { createNewPoll } = require("../lib/data-helpers.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/", (req, res) => {
    console.log(req.body);
    const isAnonymous = req.body.anonymousCheck ? true : false;
    const values = {
      inputNewQuestion: req.body.inputNewQuestion,
      inputEmail: req.body.inputEmail,
      anonymousCheck: isAnonymous,
      inputOpt1: req.body.inputOpt1,
      inputOpt1Descript: req.body.inputOpt1Descript,
      inputOpt2: req.body.inputOpt2,
      inputOpt2Descript: req.body.inputOpt2Descript,
      inputOpt3: req.body.inputOpt3,
      inputOpt3Descript: req.body.inputOpt3Descript,
      inputOpt4: req.body.inputOpt4,
      inputOpt4Descript: req.body.inputOpt4Descript,
      inputOpt5: req.body.inputOpt5,
      inputOpt5Descript: req.body.inputOpt5Descript
    };
    let newPollId;

    db.query(`
    INSERT INTO polls(question, email, anonymous)
    VALUES($1, $2, $3)
    RETURNING *;
    `, [values.inputNewQuestion, values.inputEmail, values.anonymousCheck])
    .then(res => {
      console.log(res.rows);
      newPollId = res.rows[0].id;
      if (!values.inputOpt1) {
        throw Error('No inputOpt1');
      };

      db.query(`
      INSERT INTO options(poll_id, title, description)
      VALUES($1, $2, $3);
      `, [newPollId, values.inputOpt1, values.inputOpt1Descript]);

      if (!values.inputOpt2) {
        throw Error('No inputOpt2');
      }

      db.query(`
      INSERT INTO options(poll_id, title, description)
      VALUES($1, $2, $3);
      `, [newPollId, values.inputOpt2, values.inputOpt2Descript]);

      if (!values.inputOpt3) {
        throw Error('No inputOpt3');
      }

      db.query(`
      INSERT INTO options(poll_id, title, description)
      VALUES($1, $2, $3);
      `, [newPollId, values.inputOpt3, values.inputOpt3Descript]);

      if (!values.inputOpt4) {
        throw Error('No inputOpt4');
      }

      db.query(`
      INSERT INTO options(poll_id, title, description)
      VALUES($1, $2, $3);
      `, [newPollId, values.inputOpt4, values.inputOpt4Descript]);

      if (!values.inputOpt5) {
        throw Error('No inputOpt5');
      }

      db.query(`
      INSERT INTO options(poll_id, title, description)
      VALUES($1, $2, $3);
      `, [newPollId, values.inputOpt5, values.inputOpt5Descript]);
      res.send('ok');
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  return router;
};
