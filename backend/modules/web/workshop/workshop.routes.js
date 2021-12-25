const express = require("express");
const router = express.Router();
const {
  getWorkshops,
  getWorkshop,
  nextWorkshop,
  perviousWorkshop,
  addWorkshop,
  updateWorkshop,
  deleteWorkshop,
} = require("./workshop.controller");

router.route("/").get(getWorkshops).post(addWorkshop);

router
  .route("/:id")
  .get(getWorkshop)
  .put(updateWorkshop)
  .delete(deleteWorkshop);

router.route("/:id/nextWorkshop").get(nextWorkshop);
router.route("/:id/perviousWorkshop").get(perviousWorkshop);

module.exports = router;
