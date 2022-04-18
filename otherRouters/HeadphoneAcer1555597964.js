const express = require("express");
const router = express.Router();
router.get("/products/HeadphoneAcer1555597964", function(req, res){
    res.render("./layouts/HeadphoneAcer1555597964");
});
module.exports = router;