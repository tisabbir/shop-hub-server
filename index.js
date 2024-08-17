// requirements -> express, cors
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//create app
const app = express();

//define port address
const port = process.env.PORT || 5000;

// use the middlewares 
app.use(cors());
app.use(express.json());

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
    // Connect the client to the server
    await client.connect();

    // Get the database and collection on which to run the operation
    const products = client.db("shopHubDB").collection("products");

    // Pagination Route
    app.get('/products', async (req, res) => {
      const page = parseInt(req.query.page) || 1;  // Current page number, default to 1 if not provided
      const limit = parseInt(req.query.limit) || 9; // Number of products per page, default to 10 if not provided
      const skip = (page - 1) * limit; // Calculate how many products to skip

      // Get the total number of products in the collection
      const totalProducts = await products.countDocuments();

      // Fetch the products with pagination
      const result = await products.find().skip(skip).limit(limit).toArray();

      // Send the paginated products along with pagination info
      res.json({
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products: result
      });
    });

    // Ping MongoDB to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Shop Hub is running');
});

app.listen(port, () => {
  console.log(`Shop Hub is running on port : ${port}`);
});
