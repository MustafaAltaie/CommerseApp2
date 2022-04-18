const express = require("express");
const router = express.Router();
router.get("/products/HeadphoneApple1982053101", function(req, res){
    res.render("./layouts/HeadphoneApple1982053101");
});
module.exports = router;