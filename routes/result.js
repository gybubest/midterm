const express = require('express');
const router  = express.Router({ mergeParams: true });
const { getQuestion, getOptionsWithWeighting, getAllVotersFirstOption } = require('../lib/data-helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    Promise.all ([
      getQuestion(db, res, req.params.id),
      getOptionsWithWeighting(db, res, req.params.id)
    ])
    .then( ([questionQuery, optionsQuery]) => {
      // if (getOptionsWithWeighting.error) {
      //   const templateVars {}
      // }

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
