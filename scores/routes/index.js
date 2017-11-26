/**
 * @overview Routes index
 */
const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

module.exports = router;
