const express = require('express');
const router  = express.Router({ mergeParams: true });

module.exports = (db) => {
  router.get("/", (req, res) => {
    const results = {};
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
        results.question = data.rows;
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
            results.options = data.rows;
            res.json({ results });
          })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }));
  });

  return router;
};
