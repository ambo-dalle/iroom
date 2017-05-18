var express = require('express');
var router = express.Router({mergeParams: true});
var models = require('../models');
var multer = require('multer');
var upload = multer({
  dest : 'public/uploads'
})
router.use(function(req, res, next) {
  let pathNeedLogin = [ '/edit', '/edit/..']
  let pathNeedLogOut = ['/login', '/register']
  console.log(`-------------------req.session.user = ${req.session.user}`)
  let currentUser = req.session.user
  console.log(`-------------------currentUser = ${currentUser}`)

  let currentPath = req.path
console.log('barusampe sini')
  if (pathNeedLogin.includes(currentPath)) {
    console.log('terdeteksi halaman harus login')
    if (!currentUser) {
      console.log('ngerender login page');
      res.render('login-page', {msg: "Login dlu coy!"})
    } else {
      next()
    }
  } else if (pathNeedLogOut.includes(currentPath)){
    if (currentUser) {
      res.redirect('/users/home')
    } else {
      next()
    }
  } else {
    next()
  }
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

router.post('/update/:id', (req,res,next) =>{
  let id = req.params.id
  let tempUrlPath = req.files[0].path
  let resultPath = tempUrlPath.replace('public', '')
  console.log("ini resultPath" + resultPath);
  models.Rooms.update({
    room_name : req.body.room_name,
    description : req.body.description,
    // imagePath : req.body.resultPath,
    lokasi : req.body.lokasi
  }, {
    where : {
      id : req.body.room_name
    }
  })
  .then((ressp) =>{
    res.redirect('/')

  })
  .catch((err) => {
    console.log(err);
  })
})



router.get('/edit/:id', function(req,res,next) {
  let currentUser = req.session.user;
  if (!currentUser) {
    res.redirect('/users/login')
  } else {
    models.Rooms.findOne({
      where :  {
        id : req.params.id
      }
    })
    .then(function(rooms) {
      console.log(rooms)
      res.render('edit_room', {
        dataRoom : rooms
      })
    })
  }
})



module.exports = router;
