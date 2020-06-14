const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const uploadConfig = require('./config/upload');


const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post('/posts',upload.single('image'), PostController.store);
routes.get('/posts',PostController.index);
routes.post('/posts/:id/like',LikeController.store)

module.exports = routes;