const express = require("express");
const router = express.Router();
router.get("/products/1433624052", function(req, res){
    res.render("./layouts/1433624052");
});
module.exports = router;