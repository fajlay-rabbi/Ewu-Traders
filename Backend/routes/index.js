const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');

const auth = require("../Middleware/auth");
const IsUserExist = require('../Middleware/IsUserExist');

const controllers = require('../Controller');

const multer = require("multer");




router.get('/', cookieParser(), auth, controllers.home);
router.post('/signUp',IsUserExist, controllers.signUp);
router.post('/signIn', controllers.signIn);
router.post('/checkOtp', auth, controllers.checkOtp);
router.post('/resendOtp', auth, controllers.resendOtp);
router.get('/logout',  controllers.logout);


router.get('/conversation', auth, controllers.conversation);
router.get('/chat', auth, controllers.chat);
router.get('/user', auth, controllers.user);

router.get('/allsellpost', controllers.FetchAllsellPost);
router.get('/allreqpost', controllers.FetchAllreqPost);
router.get('/allLostpost', controllers.FetchAllLostPost);


// storing image configuration
var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./upload");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
});

var upload = multer({
    storage: imgconfig
})


router.post('/createPost', upload.single("photo"), auth, controllers.createPost);
router.post('/createRequest', upload.single("photo"), auth, controllers.createRequest);
router.post('/createLostPost', upload.single("photo"), auth, controllers.createLost);





module.exports = router;
