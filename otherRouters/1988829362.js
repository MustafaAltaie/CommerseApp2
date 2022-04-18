const express = require("express");
const router = express.Router();
router.get("/products/1988829362", function(req, res){
    res.render("./layouts/1988829362");
});
module.exports = router;