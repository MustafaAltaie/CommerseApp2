const express = require("express");
const router = express.Router();
router.get("/products/1972101113", function(req, res){
    res.render("./layouts/1972101113");
});
module.exports = router;