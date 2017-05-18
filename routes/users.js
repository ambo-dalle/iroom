var express = require('express');
var router = express.Router();
var models = require('../models');
var multer = require('multer');
var upload = multer({
  dest : 'public/uploads'
})
var sequelize = require('sequelize')
/* GET users listing. */

router.use(function(req, res, next) {
  let pathNeedLogin = ['/home', '/']
  let pathNeedLogOut = ['/login', '/register']
  console.log(`-------------------req.session.user = ${req.session.user}`)
  let currentUser = req.session.user
  console.log(`-------------------currentUser = ${currentUser}`)

  let currentPath = req.path

  if (pathNeedLogin.includes(currentPath)) {
    if (!currentUser) {
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


router.get('/login', function(req, res, next) {
  res.render('login-page.ejs', {msg: ""})
})

router.post('/login', function(req, res, next) {
  let currentUser = req.body.logUsername;
  let currentPass = req.body.logPassword;
  models.User.findOne({
    where: {
      username: currentUser
    }
  }).then((user) => {
    if (!user) {
      res.render('login-page.ejs', {msg: "Username tidak di temukan bro!"})
    } else if (user.password != currentPass) {
      res.render('login-page.ejs', {msg: "Password salah bro!"})
    } else if (user.password == currentPass) {
      req.session.user = {username: currentUser}
      console.log(`------------dari post login---------${req.session.user.username}`)
      res.redirect('/users/home')
    }
  })
})

router.get('/logout', function(req, res, next) {
  delete req.session.user
  res.redirect('login')
})

router.get('/home', function(req, res, next) {
  models.Rooms.findAll({
      include : [models.Vote]
    })
    .then(rooms =>{
      res.render('home-login', {
        title : 'Daftar Tempat Penginapan',
        rooms : rooms
      })
    })
    .catch((err) => {
      console.log(err.message);
    })
})

router.get('/register', function(req, res, next) {
  res.render('regist-page.ejs', {msg: ""})
})

router.post('/register', function(req, res, next) {
  let newName = req.body.newName
  let newUsername = req.body.newUsername
  let newPass = req.body.newPassword
  let newEmail = req.body.newEmail
  let newTelp = req.body.newTelp
  models.User.findOne({
    where: sequelize.or({
      username: newUsername},{
      email: newEmail
    })
  }).then( user => {
    if (!user) {
      models.User.create({
        name: newName,
        username: newUsername,
        password: newPass,
        email: newEmail,
        telp: newTelp,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then( () => {
        res.render('login-page', {msg: "Akun berhasil di buat, silahkan log in!"})
      })
    } else {
      res.render('regist-page', {msg: "Username atau Password sudah terpakai!"})
    }
  })
})

router.post('/coba', function(req,res,next) {
  let imagekah = req.body.imageUpload
  console.log(imagekah)
})



module.exports = router;
