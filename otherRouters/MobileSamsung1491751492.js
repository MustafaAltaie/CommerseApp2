const express = require("express");
const router = express.Router();
router.get("/products/MobileSamsung1491751492", function(req, res){
    res.render("./layouts/MobileSamsung1491751492");
});
module.exports = router;