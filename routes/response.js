const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req)
    db.query(`
    SELECT title, description
    FROM options
    JOIN polls ON polls.id = poll_id
    WHERE polls.user_link = 'jetpack';`)
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

  router.post("/", (req, res) => {

  });

  return router;
};
