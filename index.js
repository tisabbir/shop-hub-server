// requirements -> express, cors
const express = require('express');
// require('express').config();
const cors = require('cors');
//require dotenv file
require('dotenv').config();
//create app
const app = express();
//define port address
const port = process.env.PORT || 5000;

// use the middle wires 
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Shop Hub is running')
})

app.listen(port, ()=>{
    console.log(`Shop Hub is running on port : ${port}`)});