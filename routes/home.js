const express = require('express');
const router  = express.Router({ mergeParams: true });
const { urlCreator, sendlinks, createQueries, createValues }= require('../lib/helpers')

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/", (req, res) => {
    // Create values and links
    const values = createValues(req);
    const adminLink = urlCreator(values.inputNewQuestion);
    const userLink = urlCreator(values.inputNewQuestion);

    //send email to creator
    sendlinks(process.env.EMAIL, process.env.PASSWORD, values.inputEmail, "You made a poll!", values.inputNewQuestion, adminLink, userLink);

    //Write queries to database
    createQueries(res, db, values, adminLink, userLink);
  });

  return router;
};
