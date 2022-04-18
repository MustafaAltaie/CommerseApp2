const express = require("express");
const router = express.Router();
router.get("/products/1579609692", function(req, res){
    res.render("./layouts/1579609692");
});
module.exports = router;