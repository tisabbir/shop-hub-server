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




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://shopHubUser:O2CK9fRP9xUNsjZG@cluster0.bq6unn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Shop Hub is running')
})

app.listen(port, ()=>{
    console.log(`Shop Hub is running on port : ${port}`)});