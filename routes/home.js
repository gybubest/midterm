const express = require('express');
const router  = express.Router({ mergeParams: true });
// const { createNewPoll } = require("../lib/data-helpers.js");

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/", (req, res) => {
    let values = [req.body.inputNewQuestion, req.body.inputEmail];
    db.query(`
    INSERT INTO polls(question, email)
    VALUES($1, $2)
    RETURNING *;
    `, values)
    .then(res => {
      console.log("back in the post", res);
      // values = [req.body.inputNewQuestion, req.body.inputEmail, req.body.inputOpt1, req.body.inputOpt1Descript, req.body.inputOpt2, req.body.inputOpt2Descript, req.body.inputOpt3, req.body.inputOpt3Descript, req.body.inputOpt4, req.body.inputOpt4Descript, req.body.inputOpt5, req.body.inputOpt5Descript];
      res.send(poll);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  return router;

  // const createNewPoll = function(poll, db) {
  //   const values = [poll.inputNewQuestion, poll.inputEmail, poll.inputOpt1, poll.inputOpt1Descript, poll.inputOpt2, poll.inputOpt2Descript, poll.inputOpt3, poll.inputOpt3Descript, poll.inputOpt4, poll.inputOpt4Descript, poll.inputOpt5, poll.inputOpt5Descript];
  //   console.log('in the createNewPoll');

  //   let queryString = `
  //   WITH new_option AS (INSERT INTO polls(question, email)
  //   VALUES($1, $2)
  //   RETURNING poll.id);
  //   // INSERT INTO options(poll_id, title, description)
  //   // VALUES((select id from new_option), $3, $4)
  //   // INSERT INTO options(poll_id, title, description)
  //   // VALUES((select id from new_option), $5, $6)
  //   `
  //   if (poll.inputOpt3) {
  //     queryString += `INSERT INTO options(poll_id, title, description) VALUES((select id from new_option), $7, $8)`;
  //   }

  //   if (poll.inputOpt4) {
  //     queryString += `INSERT INTO options(poll_id, title, description) VALUES((select id from new_option), $9, $10)`;
  //   }

  //   if (poll.inputOpt5) {
  //     queryString += `INSERT INTO options(poll_id, title, description) VALUES((select id from new_option), $11, $12)`;
  //   }
  //   console.log('queryString', queryString, 'values', values)
  //   return db.query((queryString + ';'), values)
  //   .then(res => {
  //     console.log("in the query promise", res);
  //     if (res.rows) {
  //       console.log( "res.rows",res.rows);
  //       return res.rows;
  //     }
  //     return null;
  //   })
  //   .catch(err => console.log(err));
  // };

  // router.post("/", (req, res) => {
  //   createNewPoll(req.body, db)
  //     .then(poll => {
  //       console.log("back in the post", poll);
  //       res.send(poll);
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e)
  //     });
  // });
  // const createNewPoll = function(poll, db) {
    // const values = [poll.inputNewQuestion, poll.inputEmail, poll.inputOpt1, poll.inputOpt1Descript, poll.inputOpt2, poll.inputOpt2Descript, poll.inputOpt3, poll.inputOpt3Descript, poll.inputOpt4, poll.inputOpt4Descript, poll.inputOpt5, poll.inputOpt5Descript];
    // let queryString = `
    // WITH new_option AS ()
    // INSERT INTO options(poll_id, title, description)
    // VALUES((select id from new_option), $3, $4)
    // `
    // if (poll.inputOpt3) {
    //   queryString += `INSERT INTO options(poll_id, title, description) VALUES((select id from new_option), $7, $8)`;
    // }

    // if (poll.inputOpt4) {
    //   queryString += `INSERT INTO options(poll_id, title, description) VALUES((select id from new_option), $9, $10)`;
    // }

    // if (poll.inputOpt5) {
    //   queryString += `INSERT INTO options(poll_id, title, description) VALUES((select id from new_option), $11, $12)`;
    // }


};
