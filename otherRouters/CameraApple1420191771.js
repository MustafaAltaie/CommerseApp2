const express = require("express");
const router = express.Router();
router.get("/products/CameraApple1420191771", function(req, res){
    res.render("./layouts/CameraApple1420191771");
});
module.exports = router;