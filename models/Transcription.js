const mongoose = require('mongoose');

const transcriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ownersEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    audioFileURL: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transcription = mongoose.model('Transcription', transcriptionSchema);

module.exports = Transcription;
