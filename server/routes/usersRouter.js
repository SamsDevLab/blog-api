const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.post("/", usersController.createNewUser);

router.put("/:userId", usersController.editUser);

router.delete("/:userId", usersController.deleteUser);

module.exports = router;
