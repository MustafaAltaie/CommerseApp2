const express = require("express");
const router = express.Router();
router.get("/products/LaptopAcer1215985676", function(req, res){
    res.render("./layouts/LaptopAcer1215985676");
});
module.exports = router;