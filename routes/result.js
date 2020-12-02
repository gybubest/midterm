const express = require('express');
const router  = express.Router({ mergeParams: true });
const { getQuestion, getOptionsWithWeighting, getAllVotersFirstOption } = require('../lib/data-helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    Promise.all ([
      getQuestion(db, req.params.id),
      getOptionsWithWeighting(db, req.params.id)
    ])
    .then( ([questionQuery, optionsQuery]) => {
      console.log("***questionQuery =", questionQuery);
      const templateVars = { question: questionQuery, results: optionsQuery};
      console.log("templateVars =", templateVars);
      res.render("result", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.stack })
    });
  });

  return router;
};
