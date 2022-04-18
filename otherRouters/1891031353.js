const express = require("express");
const router = express.Router();
router.get("/products/1891031353", function(req, res){
    res.render("./layouts/1891031353");
});
module.exports = router;