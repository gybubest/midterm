const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params)
    db.query(`
    SELECT *
    FROM options
    JOIN polls ON polls.id = poll_id
    WHERE polls.user_link = $1;`, [req.params.id])
      .then(data => {
        const options = data.rows;
        res.json({options})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.post("/:id", (req, res) => {

  });

  return router;
};
