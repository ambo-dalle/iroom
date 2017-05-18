var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
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


router.get('/detail/:id', (req,res,next)=>{
  const item = models.Rooms.find(i =>{
    return i.id === req.params.id
  })
  res.render('detail', {items : item})
})


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


//Cekasasasasas


module.exports = router;
