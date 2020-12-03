const express = require('express');
const router  = express.Router({ mergeParams: true });
const { getQuestion, getOptionsWithPercentage, getAllVotersFirstOption, getColorsForNumberOfOptions } = require('../lib/data-helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    Promise.all([
      getQuestion(db, req.params.id),
      getOptionsWithPercentage(db, req.params.id),
      getAllVotersFirstOption(db, req.params.id)
    ])
      .then(([questionQuery, optionsQuery, votersFirstOption]) => {
        if(!optionsQuery['error']) {
          optionsQuery = getColorsForNumberOfOptions(optionsQuery);
        }
        const templateVars = { question: questionQuery, results: optionsQuery, firstOption: votersFirstOption };
        console.log("***templateVars =", templateVars)
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
