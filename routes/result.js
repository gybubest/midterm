const express = require('express');
const router  = express.Router({ mergeParams: true });
const { getQuestion, getOptionsWithWeighting, getAllVotersFirstOption } = require('../lib/data-helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    // *** new starts
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
    // const query1 = getQuestion(db, req.params.id),
    // const query2 = getOptionsWithWeighting(db, req.params.id)
    // let query3 = {};
    // *** new ends

    // console.log("I'm at /my/:id", "id:", req.params.id);
    // *** Testing removing queries start ***
    // db.query(`
    //   SELECT question
    //   FROM polls
    //   WHERE admin_link = $1;`,
    //   [req.params.id])
    //   .then(data => {
    //     // const poll_result = data.rows;
    //     // console.log(poll_results);
    //     // res.json({ poll_result });
    //     query1.question = data.rows[0].question;
    //     // res.json({ results });
    //   })
    //   .then(
    //     db.query(`
    //       SELECT title, sum(weighting)
    //       FROM response_options
    //       JOIN polls ON poll_id = polls.id
    //       JOIN options ON option_id = options.id
    //       WHERE admin_link = $1
    //       GROUP BY title
    //       ORDER BY SUM(weighting) DESC;`,
    //       [req.params.id]
    //       )
    //       .then(data => {
    //         let total = 0;
    //         // console.log("data.rows = ", data.rows);
    //         data.rows.forEach((element, index) => {
    //           // console.log(element);
    //           query2[index] = Object.values(element);
    //         })
    //         console.log("query2 = ", query2);
    //         // calculate percentage of max weighted points (first object is the max since the query is ordered by sum of weighted points for each option)
    //         const max = query2['0'][1];
    //         console.log("Max =", max);
    //         for (let obj in query2) {
    //           console.log("query2[obj][1]", query2[obj][1]);
    //           query2[obj][1] = Math.floor(query2[obj][1] / max * 100)
    //           console.log("Percentage = ", query2[obj][1])
    //         }
    //         const templateVars = { question: query1.question, results: query2};
    //         // res.json({ results });
    //         console.log(templateVars);
    //         // console.log(results);
    //         res.render("result", templateVars);
    //       })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   }));
    // *** Testing removing queries ends ***
  });

  return router;
};
