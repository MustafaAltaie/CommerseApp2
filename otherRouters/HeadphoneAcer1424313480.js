const express = require("express");
const router = express.Router();
router.get("/products/HeadphoneAcer1424313480", function(req, res){
    res.render("./layouts/HeadphoneAcer1424313480");
});
module.exports = router;