const Transcription = require('../models/Transcription');
const AWS = require('aws-sdk');
require('dotenv').config()


// Configure AWS credentials
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecret = process.env.AWS_SECRET;
const awsRegion = process.env.AWS_REGION;
const awsBucketName = process.env.AWS_BUCKET_NAME;

AWS.config.update({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecret,
  region: awsRegion,
});

// Create an S3 instance
const s3 = new AWS.S3();


// Function to extract the audio file key from the S3 URL
const extractAudioFileKey = (audioFileURL) => {
    const urlParts = audioFileURL.split('/');
    return decodeURIComponent(urlParts[urlParts.length - 1]);
  };



const generateAudioFileUrl = async (audioFileKey) => {

    const params = {
      Bucket: awsBucketName,
      Key: audioFileKey,
      Expires: 3600, // URL expiration time in seconds
    };
  
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (error, url) => {
        if (error) {
          reject(error);
        } else {
          resolve(url);
        }
      });
    });
  };


  module.exports ={
    extractAudioFileKey,
    generateAudioFileUrl
  }