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

app.use('/api/users', userRoutes);
app.use('/api/transcription', transcriptionRouter);

app.listen(PORT,()=>{
    console.log(`Listening at PORT: ${PORT}`)
})