
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



async function transcribe(filename) {
  const transcript = await openai.createTranscription(
    fs.createReadStream(filename),
    "whisper-1"
  );
  return transcript.data.text;
}







// const Whisper = require('whisper-nodejs');
// const whisper = new Whisper('process.env.OPENAI_API_KEY');

// const transcribe  = async (filepath)=>
// {
//   whisper.transcribe(filepath, 'whisper-1')
//   .then(text => {
//     console.log(text);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }


module.exports = transcribe