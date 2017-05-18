var express = require('express');
var router = express.Router();
var models = require('../models');
const convertDate = require('../helper/convert_date').convertDate;

router.get('/', (req,res,next)=>{
  res.render('create_post');
})


router.post('/', (req,res,next) =>{
  models.Post.findAll({
    include : [{
      models : models.Rooms
    }],
    order : ' "updatedAt" DESC'
  })
  .then((posts) => {
    let newData = posts.map(function(record) {
      record.dataValues.createdAt = convertDate(record.dataValues.createdAt)
      record.dataValues.updatedAt = convertDate(record.dataValues.updatedAt)
      return record
    });
    res.render('index_post', {
      title : 'Daftar Penginapan',
      dataPosts : newData
    })
  })
  .catch((err) => {
    console.log(err.message);
  })
})


router.post('/create', (req,res,next) =>{
  console.log('Test' + req.body.title);
  console.log(req.body.description);
  console.log(req.body.room_id);
  models.Post.create({
    title : req.body.title,
    description : req.body.description,
    room_id : req.body.room_id
  })
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err.message);
  })
})

router.get('/delete/:id', (req,res,next) =>{
  let id = req.params.id
  models.Post.destroy({
    where : {
      id : id
    }
  })
  .then(() =>{
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err.message);
  })
})

router.post('/edit_post/:id', (req,res,next)=>{
  let id = req.params.id
  models.Post.update({
    title : req.body.title,
    description : req.body.description,
    room_id : req.body.room_id
  }, {
    where : {
      id : id
    }
  })
  .then(()=>{
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err.message);
  })
})

module.exports = router;
