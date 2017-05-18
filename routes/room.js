var express = require('express');
var router = express.Router();
var models = require('../models');
var multer = require('multer');
var upload = multer({
  dest : 'public/uploads'
})

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload', upload.any(), (req,res,next) =>{
  let tempUrlPath = req.files[0].path
  let resultPath = tempUrlPath.replace('public', '');
  console.log("Ini tempUrlPath"+tempUrlPath);
  console.log(resultPath);
  // console.log(`hasil = ${resultPath}`);
  models.Rooms.create({
    room_name :  req.body.room_name,
    description : req.body.description,
    imagePath : resultPath,
    lokasi : req.body.lokasi
  })
  .then(() =>{
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err);
  })
})

router.get('/delete/:id', (req,res,next) =>{
  let id = req.params.id
  models.Rooms.destroy({
    where : {
      id : id
    }
  })
  .then(()=>{
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err);
  })
})

router.post('/edit/:id', (req,res,next) =>{
  let id = req.params.id
  let tempUrlPath = req.files[0].path
  let resultPath = tempUrlPath.replace('public', '')
  models.Rooms.update({
    room_name : req.body.room_name,
    description : req.body.description,
    imagePath : req.body.resultPath,
    lokasi : req.body.lokasi
  }, {
    where : {
      id : id
    }
  })
  .then(() =>{
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err);
  })
})



module.exports = router;
