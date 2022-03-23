var express = require("express");
var router = express.Router();
var hobbiesController = require("../controller/hobbies");

router.get("/", hobbiesController.getHobbies);
router.post("/", hobbiesController.addHobby);
router.delete("/:id", hobbiesController.deleteHobby);
module.exports = router;
