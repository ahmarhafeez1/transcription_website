# MEETORYTE

## Description

This project is an API for managing transcriptions. It allows users to upload audio files, transcribe them, update transcriptions, and delete transcriptions. The transcriptions are stored in a MongoDB database and the audio files are stored in an Amazon S3 bucket.

## Features

- Upload audio files for transcription
- Transcribe audio files using AI models
- Update existing transcriptions
- Delete transcriptions
- Download audio files from the S3 bucket
- Retrieve transcriptions for a specific user

## Installation

1. Clone the repository
2. Install the dependencies:
   cd project-folder
   npm install
3. Set up the environment variables:

Create a .env file in the project root.

Add the following variables to the .env file:
PORT=3000 <br />
MONGODB_URI=your-mongodb-uri <br />
AWS_ACCESS_KEY_ID=your-aws-access-key-id <br />
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key <br />
AWS_BUCKET_NAME=your-aws-bucket-name <br />
4. Start the server:
  npm start

# Technologies Used
* Node.js
* Express.js
* MongoDB
* Amazon S3
* OpenAI
## Authors
  Ahmar Hafeez <br />

## Front-end for this project was created by:
alizaycheema<br />
https://github.com/alizaycheema/transcription_app_frontend<br />

##License
This project is licensed under the MIT License.
