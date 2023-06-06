const express =require('express')
const connectDB = require('./config/connect.js');
const userRoutes = require('./routes/UserRoutes')
require('dotenv').config();




const PORT = process.env.PORT
connectDB()
const app = express()
app.use(express.json())


app.use('/api/users', userRoutes);
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log(`Listening at PORT: ${PORT}`)
})