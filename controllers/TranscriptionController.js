const Transcription = require('../models/Transcription');
const uploadFileToS3 = require('../middleware/uploadFile');



const createTranscription = async (req, res) => {
  try {
    // Get the audio file from the request
    console.log(req)
    const audioFile = req.file;

    // Check if an audio file was provided
    if (!audioFile) {
      return res.status(400).json({ message: 'No audio file provided' });
    }

    // Upload the audio file to S3
    const audioFileURL = await uploadFileToS3(audioFile);

    return res.status(200).json({ message: `${audioFileURL}`});

  }

  catch{
    return res.status(400).json({ message: 'Error Generating Transciption' });
  }
}

module.exports = {
  createTranscription,
};
