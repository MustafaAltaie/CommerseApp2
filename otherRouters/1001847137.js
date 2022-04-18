const express = require("express");
const router = express.Router();
router.get("/products/1001847137", function(req, res){
    res.render("./layouts/1001847137");
});
module.exports = router;