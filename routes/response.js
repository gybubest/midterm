const express = require('express');
const router  = express.Router({ mergeParams: true });



module.exports = (db) => {
  router.get("/", (req, res) => {
    const response = {};
    db.query(`
    SELECT question
    FROM polls
    WHERE polls.user_link = $1;
    `, [req.params.id])
    .then(data => {
      response.question = data.rows;
    })
    .then(
    db.query(`
    SELECT title, description
    FROM options
    JOIN polls ON polls.id = poll_id
    WHERE polls.user_link = $1;`, [req.params.id])
      .then(data => {
        response.options = data.rows;
        res.json(response)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }));

  });

  router.post("/", (req, res) => {

  });

  return router;
};
