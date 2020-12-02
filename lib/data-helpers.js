const express = require('express');
const router  = express.Router({ mergeParams: true });

const getQuestion = (db, adminLink) => {
  return db.query(`
    SELECT question
    FROM polls
    WHERE admin_link = $1;`
    , [ adminLink ])
      .then(result => {
        if (result.rows) {
          console.log("getQuestion =", result.rows);
          return result.rows[0].question;
        };
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

};

const getOptionsWithWeighting = (db, adminLink) => {
  return db.query(`
    SELECT title, sum(weighting)
    FROM response_options
    JOIN polls ON poll_id = polls.id
    JOIN options ON option_id = options.id
    WHERE admin_link = $1
    GROUP BY title
    ORDER BY SUM(weighting) DESC;`
    , [ adminLink ])
      .then(result => {
        let total = 0;
        let query = {};
        result.rows.forEach((element, index) => {
          query[index] = Object.values(element);
        });
        console.log("query(options) = ", query);
        // calculate percentage of max weighted points (first object is the max since the query is ordered by sum of weighted points for each option)
        const max = query['0'][1];
        console.log("Max =", max);
        for (let obj in query) {
          console.log("query[obj][1]", query[obj][1]);
          query[obj][1] = Math.floor(query[obj][1] / max * 100)
          console.log("Percentage = ", query[obj][1])
        };
        console.log("Final query(options) =", query);
        return query;
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

};

 // Get all voter_name's top choice (not implemented yet).
const getAllVotersFirstOption = (db, adminLink) => {
  return db.query(`
  SELECT voter_name, option_id
  FROM response_options
  JOIN polls ON poll_id = polls.id
  JOIN options ON option_id = options.id
  JOIN responses ON response_id = responses.id
  WHERE admin_link = $1
  AND weighting = 1;`
  , [ adminLink ])
      .then(result => {
        if (result.rows) {
          console.log("getAllVotersFirstOption = ", result.rows);
          return result.rows;
        };
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
};

module.exports = { getQuestion, getOptionsWithWeighting, getAllVotersFirstOption };
