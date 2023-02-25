const express = require('express');
const router = express.Router();
const { ownerImages, changeOwner, singleproduct, signUp, signIn, allproduct, addproduct, deleteproduct, updateproduct, } = require('../controller/contoller')
const { checkMissingField, checkDuplicateEmail } = require("../middleware/sign.validate");
const verifyToken = require("../middleware/auth")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:|\./g, '') + ' - ' + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//upload name k folder may files save hogi
const upload = multer({ storage: storage, fileFilter: fileFilter })


//Get All Product
router.get("/api/allproduct", [verifyToken], allproduct);
//Change Owner
router.post("/api/changeOwner", [verifyToken], changeOwner);
//Get Single Product
router.get("/api/singleproduct", singleproduct);
//Get Single Product
router.get("/api/ownerImages", [verifyToken], ownerImages);
//Insert A Product  upload.single('productImage')
router.post("/api/addproduct", [verifyToken], addproduct);
//Delete A Product
router.delete("/api/deleteproduct", [verifyToken], deleteproduct);
//Update A Product
router.put("/api/updateproduct", [verifyToken], updateproduct);


//signup
router.post("/api/Signup", [checkDuplicateEmail, checkMissingField], signUp);
//login
router.post('/api/signIn', signIn)

module.exports = router