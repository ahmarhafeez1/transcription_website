const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config()

// Configure AWS credentials
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecret = process.env.AWS_SECRET;
const awsRegion = process.env.AWS_REGION;

AWS.config.update({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecret,
  region: awsRegion,
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
const uploadFileToS3 = async (file) => {
  try {
    // Read the file data
    const fileData = fs.readFileSync(file.path);

    // Set the parameters for S3 upload
    const params = {
      Bucket: 'transcriptionapp1', // Replace with your bucket name
      Key: file.originalname, // Use the original file name as the S3 key
      Body: fileData,
    };

    // Upload the file to S3
    const uploadResult = await s3.upload(params).promise();

    // Return the URL of the uploaded file
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
};

module.exports = uploadFileToS3;