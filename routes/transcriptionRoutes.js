const express = require('express');
const transcriptionController = require('../controllers/TranscriptionController');
const { verify } = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')
const multer = require('multer')
const path = require('path');



const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${fileExtension}`;
    cb(null, filename);
  }
});


const upload = multer({
storage});


const uploadAudio = upload.single('audio');

const transcriptionRouter = express.Router();

transcriptionRouter.post('/create-trancription',uploadAudio,verifyToken,transcriptionController.createTranscription)
transcriptionRouter.get('/',verifyToken,transcriptionController.getTranscriptions)
transcriptionRouter.patch('/update-transcription',verifyToken,transcriptionController.updateTranscription)
transcriptionRouter.get('/:id',verifyToken,transcriptionController.getTranscription)
transcriptionRouter.delete('/:id',verifyToken,transcriptionController.deleteTranscription)

module.exports = transcriptionRouter
