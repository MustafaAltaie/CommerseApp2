const express = require("express");
const router = express.Router();
router.get("/products/1446632466", function(req, res){
    res.render("./layouts/1446632466");
});
module.exports = router;