const express =require('express')
const connectDB = require('./config/connect.js');
require('dotenv').config();




const PORT = process.env.PORT
connectDB()


const app = express()
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log(`Listening at PORT: ${PORT}`)
})