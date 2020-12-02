const express = require('express');
const router  = express.Router({ mergeParams: true });

module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVars = {
      adminLink: req.params.id,
      userLink: '',
      question: ''
    };

    db.query(`
      SELECT * FROM polls
      WHERE admin_link = $1;
    `, [templateVars.adminLink])
    .then((result) => {
      templateVars.userLink = result.rows[0]['user_link'];
      templateVars.question = result.rows[0]['question'];
      console.log('templateVars:', templateVars);
      res.render("links", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });

  });

  return router;
};
