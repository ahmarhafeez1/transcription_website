const express = require('express');
const transcriptionController = require('../controllers/TranscriptionController');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' });


const transcriptionRouter = express.Router();

const uploadAudio = upload.single('audio');
transcriptionRouter.post('/upload-audio',verifyToken,uploadAudio,transcriptionController.createTranscription)


module.exports = transcriptionRouter
