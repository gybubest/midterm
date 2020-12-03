const express = require('express');
const router  = express.Router({ mergeParams: true });

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("thanks");

  });

  return router;
};
