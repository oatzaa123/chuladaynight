const express = require("express");
const router = express.Router();
const { getPartners, addPartner } = require("./partner.controller");

router.route("/").get(getPartners).post(addPartner);

module.exports = router;
