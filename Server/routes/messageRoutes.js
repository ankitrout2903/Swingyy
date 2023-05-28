const {addMessage, getMessage} = require("../controllers/messageController");
const {cookieJwtAuth} = require("../middleware/cookieJwtAuth");

const router = require("express").Router();

router.post("/addmsg",addMessage);
router.post("/getmsg", getMessage);


module.exports = router;