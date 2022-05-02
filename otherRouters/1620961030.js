const express = require("express");
const router = express.Router();
router.get("/products/1620961030", function(req, res){
    res.render("./layouts/1620961030");
});
module.exports = router;