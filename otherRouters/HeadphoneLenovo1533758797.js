const express = require("express");
const router = express.Router();
router.get("/products/HeadphoneLenovo1533758797", function(req, res){
    res.render("./layouts/HeadphoneLenovo1533758797");
});
module.exports = router;