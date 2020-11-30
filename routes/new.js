const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("new");
  });

  router.post("/", (req, res) => {
    res.render("after submit page not done yet");
  });

  return router;
};
