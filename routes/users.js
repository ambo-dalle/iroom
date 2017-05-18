var express = require('express');
var router = express.Router();
var models = require('../models');
var multer = require('multer');
var upload = multer({
  dest : 'public/uploads'
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('file_upload');
});



router.post('/', upload.any(), (req, res, next) => {
    let tempUrlPath = req.files[0].path
    let resultPath = tempUrlPath.replace('public', '')
    console.log(`hasil = ${resultPath}`);
    models.Rooms.create({
            room_name: req.body.room_name,
            description: req.body.description,
            imagePath: resultPath,
            lokasi : req.body.lokasi
        })
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err.message);
        })
    // console.log(req.files[0].path);
    // res.send(req.files)
})


module.exports = router;
