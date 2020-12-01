const express = require('express');
const router  = express.Router({ mergeParams: true });

module.exports = () => {
  router.get("/", (req, res) => {
<<<<<<< HEAD
    res.render("new");
=======
    res.send("hello there");
>>>>>>> get_poll
  });

  return router;
};
