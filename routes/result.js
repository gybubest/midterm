const express = require('express');
const router  = express.Router({ mergeParams: true });
const { getQuestion, getOptionsWithPercentage, getAllVotersFirstOption } = require('../lib/data-helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    Promise.all([
      getQuestion(db, req.params.id),
      getOptionsWithPercentage(db, req.params.id),
      getAllVotersFirstOption(db, req.params.id)
    ])
      .then(([questionQuery, optionsQuery, votersFirstOption]) => {
        const templateVars = { question: questionQuery, results: optionsQuery, firstOption: votersFirstOption };
        res.render("result", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.stack });
      });
  });

  return router;
};
