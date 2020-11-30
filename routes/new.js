const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
<<<<<<< HEAD
    res.render("new");
=======
    res.send("hello there");
>>>>>>> get_poll
  });

  router.post("/", (req, res) => {
    res.render("after submit page not done yet");
  });

  return router;
};
