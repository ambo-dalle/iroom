var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.use(function(req, res, next) {
  // let pathNeedLogin = ['/']
  let pathNeedLogOut = ['users/login', 'users/register', '/']
  console.log(`-------------------req.session.user = ${req.session.user}`)
  let currentUser = req.session.user
  console.log(`-------------------currentUser = ${currentUser}`)

  let currentPath = req.path

  // if (pathNeedLogin.includes(currentPath)) {
  //   if (!currentUser) {
  //     res.render('login-page', {msg: "Login dlu coy!"})
  //   } else {
  //     next()
  //   }
  // } else
  if (pathNeedLogOut.includes(currentPath)){
    if (currentUser) {
      res.redirect('/users/home')
    } else {
      res.redirect('/users/login')
    }
  } else {
    next()
  }
})

router.get('/', function(req, res, next) {
  models.Rooms.findAll({
    include : [models.Vote]
  })
  .then(rooms =>{
    res.render('index', {
      title : 'Daftar Tempat Penginapan',
      rooms : rooms
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
});

router.get('edit/:id', (req,res,next) =>{
  let id = req.params.id
  models.Rooms.findById(id)
  .then(rooms =>{
    res.render('edit_lokasi', {
      title : 'Ubah Lokasi Rooms',
      dataRoom : rooms,
      id : id
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
})


router.post('/create', (req,res,next) =>{
  models.Rooms.findAll()
  .then(rooms =>{
    res.render('create_post', {
      title : 'Buat Rooms Baru',
      dataRoom : rooms
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
})


router.get('/edit-post/:id', (req,res,next) =>{
  let id =  req.params.id
  models.Post.findById(id)
  .then(post =>{
    models.Rooms.findAll()
    .then(rooms =>{
      res.render('edit_post', {
        title : 'Ubah Postingan',
        id : id,
        dataPost: post,
        dataRoom : rooms
      })
    })
    .catch((err) => {
      console.log(err.message);
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
})


router.get('/vote/:id', (req,res,next) =>{
  let id = req.params.id
  models.Vote.findOrCreate({
    where : {
      room_id : id
    }
  })
  .then(vote =>{
    let last = vote[0].count
    if (last === null) {
      last = 0
    }
    let room = vote[0].room_id
    models.Vote.update({
      count : last + 1
    }, {
      fields : ['count'],
      where : {
        room_id : room
      }
    })
    .then(row =>{
      res.redirect('/')
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
})


router.get('/getRoomById', (req,res,next) =>{
  let id = req.params.id
  models.Rooms.findById(id, {
    include : [models.Vote]
  })
  .then(room =>{
    res.render('home', {
      room : room
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
})

module.exports = router;
