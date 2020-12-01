const express = require('express');
const router  = express.Router({ mergeParams: true });

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query1 = {};
    const query2 = {};
    const url = req.params.id
    console.log("I'm at /my/:id", "id:", req.params.id);
    db.query(`
      SELECT question
      FROM polls
      WHERE admin_link = $1;`,
      [req.params.id])
      .then(data => {
        // const poll_result = data.rows;
        // console.log(poll_results);
        // res.json({ poll_result });
        query1.question = data.rows[0].question;
        // res.json({ results });
      })
      .then(
        db.query(`
          SELECT title, sum(weighting)
          FROM response_options
          JOIN polls ON poll_id = polls.id
          JOIN options ON option_id = options.id
          WHERE admin_link = $1
          GROUP BY title
          ORDER BY SUM(weighting) DESC;`,
          [req.params.id]
          )
          .then(data => {
            // console.log("data.rows[0] = ", data.rows[0]);
            data.rows.forEach((element, index) => {
              // console.log(element);
              query2[index] = Object.values(element);
            });
            const templateVars = { question: query1.question, results: query2};
            // res.json({ results });
            console.log(templateVars);
            // console.log(results);
            res.render("result", templateVars);
          })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }));
  });

  return router;
};
