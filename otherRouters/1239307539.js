const express = require("express");
const router = express.Router();
router.get("/products/1239307539", function(req, res){
    res.render("./layouts/1239307539");
});
module.exports = router;