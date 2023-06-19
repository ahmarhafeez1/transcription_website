const express =require('express')
const connectDB = require('./config/connect.js');
const userRoutes = require('./routes/UserRoutes')
const transcriptionRouter = require('./routes/transcriptionRoutes.js')
const cors = require("cors");
require('dotenv').config();




const PORT = process.env.PORT
connectDB()
const app = express()
app.use(cors());
app.use(express.json())


app.post('/', )
app.get('/', (req, res) => {
    const projectName = 'Project By Alizay Farooq and Ahmar Hafeez';
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Welcome</title>
          <style>
            body {
              background-color: #000;
              color: #fff;
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 100px;
            }
  
            h1 {
              font-size: 48px;
              margin-bottom: 40px;
            }
  
            p {
              font-size: 24px;
            }
  
            .glitch {
              color: #0f0;
              animation: glitch-animation 2s infinite;
            }
  
            @keyframes glitch-animation {
              0% {
                transform: translate(0);
              }
              25% {
                transform: translate(-5px, -5px);
              }
              50% {
                transform: translate(5px, 5px);
              }
              75% {
                transform: translate(-5px, 5px);
              }
              100% {
                transform: translate(5px, -5px);
              }
            }
          </style>
        </head>
        <body>
          <h1>Welcome to our <span class="glitch">Project!</span></h1>
          <p>${projectName}</p>
        </body>
      </html>
    `;
    res.send(html);
  });
app.use('/api/users', userRoutes);
app.use('/api/transcription', transcriptionRouter);

app.listen(PORT,()=>{
    console.log(`Listening at PORT: ${PORT}`)
})