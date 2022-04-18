const express = require("express");
const router = express.Router();
router.get("/products/1711588326", function(req, res){
    res.render("./layouts/1711588326");
});
module.exports = router;