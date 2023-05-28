const {register, login, getAllUsers} = require("../controllers/userController");
const {cookieJwtAuth} = require("../middleware/cookieJwtAuth");

const router = require("express").Router();

router.post("/register",register);
router.post("/login", login);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;