const Transcription = require('../models/Transcription');
const uploadFileToS3 = require('../middleware/uploadFile');
const transcribe = require('../middleware/transcribeAudio');
const { text } = require('express');
const {extractAudioFileKey,generateAudioFileUrl} = require('../middleware/generateFileLink')

const createTranscription = async (req, res) => {
  try {
    const {title} = req.body;
    const ownerID = req.user.userId
    const audioFile = req.file;

    // Check if an audio file was provided
    if (!audioFile) {
      return res.status(400).json({ message: 'No audio file provided' });
    }


    console.log(req.user)

    // Set the content type to 'audio/mp3' for MP3 files
    audioFile.contentType = 'audio/mp3';

    // Upload the audio file to S3
    const audioFileURL = await uploadFileToS3(audioFile);

    // Transcribe the audio file
    const text = await transcribe(audioFile.path);

    newTranscription = new Transcription({
      title,
      ownerID,
      audioFileURL,
      text
    })
    res.body =await newTranscription.save();






    // Return the created transcription along with the URL and other details
    return res.status(201).json(res.body);
  } catch (error) {
    console.error('Error creating transcription:', error);
    return res.status(500).json({ message: 'Failed to create transcription' });
  }
};


const getTranscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all transcriptions for the user
    const transcriptions = await Transcription.find({ ownerID: userId });

    // Return the transcriptions as the response
    return res.status(200).json({
      message: 'Transcriptions retrieved successfully',
      transcriptions,
    });
  } catch (error) {
    console.error('Error retrieving transcriptions:', error);
    return res.status(500).json({ message: 'Failed to retrieve transcriptions' });
  }
};


const updateTranscription = async (req, res) => {
  try {
    const { id, updatedText } = req.body;
    const userId = req.user.userId;
    console.log("TID:")
    console.log(id)
    console.log(updatedText)
    console.log(userId)

    // Find the transcription by ID and owner's ID
    const transcription = await Transcription.findOne({ _id: id, ownerID: userId });
    console.log(transcription)
    // Check if the transcription exists and belongs to the user
    if (!transcription) {
      return res.status(404).json({ message: 'Transcription not found' });
    }

    // Update the transcription's text with the updated text
    transcription.text = updatedText;

    // Save the updated transcription
    const updatedTranscription = await transcription.save();
    console.log("I WAS HERE")
    // Return the updated transcription as the response
    return res.status(200).json({
      message: 'Transcription updated successfully',
      updatedTranscription,
    });
  } catch (error) {
    console.error('Error updating transcription:', error);
    return res.status(500).json({ message: 'Failed to update transcription' });
  }
};



const getTranscription = async (req, res) => {
  try {
    const transcription = await Transcription.findById(req.params.id);
    if (!transcription) {
      return res.status(404).json({ message: 'Transcription not found' });
    }


    const audioFileKey = extractAudioFileKey(transcription.audioFileURL)
    const audioFileUrl = await generateAudioFileUrl(audioFileKey);

    res.json({ audioFileUrl, transcription });
  } catch (error) {
    console.error('Error retrieving transcription:', error);
    res.status(500).json({ message: 'Failed to retrieve transcription' });
  }
};



const deleteTranscription = async (req, res) => {
  try {
    const transcriptionId = req.params.id;
    const userId = req.user.userId
    // Find the transcription by its ID
    const transcription = await Transcription.findById({_id: transcriptionId,ownerID: userId});

    // Check if the transcription exists
    if (!transcription) {
      return res.status(404).json({ message: 'Transcription not found' });
    }

    // Delete the transcription from the database
    await Transcription.findByIdAndRemove(transcriptionId);

    return res.status(200).json({ message: 'Transcription deleted successfully' });
  } catch (error) {
    console.error('Error deleting transcription:', error);
    return res.status(500).json({ message: 'Failed to delete transcription' });
  }
};

module.exports = {
  deleteTranscription,
};




module.exports = {
  createTranscription,
  getTranscriptions,
  updateTranscription,
  getTranscription,
  deleteTranscription
};
