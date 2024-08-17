// requirements -> express, cors
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//create app
const app = express();

//define port address
const port = process.env.PORT || 5000;

// use the middlewares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://shopHubUser:O2CK9fRP9xUNsjZG@cluster0.bq6unn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Get the database and collection on which to run the operation
    const products = client.db("shopHubDB").collection("products");

    // Pagination Route
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 9;
      const skip = (page - 1) * limit;
      const searchQuery = req.query.search || ""; 

      const category = req.query.category || "";
      const brand = req.query.brand || ""; 
      const minPrice = parseInt(req.query.minPrice) || 0; 
      const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER; 

      const sortField = req.query.sortField || ""; 
      const sortOrder = req.query.sortOrder || ""; 

      //  filter search query, category, brand, and price
      const query = {
        ...(searchQuery && { name: { $regex: searchQuery, $options: "i" } }),
        ...(category && { category: category }),
        ...(brand && { brand: brand }),
        price: { $gte: minPrice, $lte: maxPrice },
      };

    
  const sortOptions = {};
  if (sortField && sortOrder) {
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;
  }

     
      const totalProducts = await products.countDocuments(query);

      
      const productsList = await products
    .find(query)
    .sort(sortOptions) 
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .toArray();

      
      res.send({
        products: productsList,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      });
    });

    // Ping MongoDB to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Shop Hub is running");
});

app.listen(port, () => {
  console.log(`Shop Hub is running on port : ${port}`);
});
