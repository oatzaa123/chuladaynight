const express = require("express");
const router = express.Router();
const {
  getNews,
  getOneNews,
  addNews,
  nextNews,
  perviousNews,
  updateNews,
  deleteNews,
} = require("./news.controller");

router.route("/").get(getNews).post(addNews);

router.route("/:id").get(getOneNews).put(updateNews).delete(deleteNews);
router.route("/:id/nextNews").get(nextNews);
router.route("/:id/perviousNews").get(perviousNews);

module.exports = router;
