const express = require("express");
const router = express.Router();
router.get("/products/1610076837", function(req, res){
    res.render("./layouts/1610076837");
});
module.exports = router;