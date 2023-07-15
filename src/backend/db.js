const dotenv = require("dotenv")
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
const express = require('express')
const User = require('./models/User')
// set up mongodb
dotenv.config()
const connectionString = `mongodb+srv://${process.env.REACT_APP_DB_USERNAME}:${process.env.REACT_APP_DB_PASSWORD}@csbulletin.gjbzahg.mongodb.net/?retryWrites=true&w=majority`

// const client = new MongoClient(connectionString); may need for later
var ObjectId = require('mongodb').ObjectId; 

// set up server
const port = 5000
const app = express()
app.use(express.json())
// mongodb/mongoose configurations
mongoose.connect(connectionString)
  .then(() => {
    app.listen(port, () => {
      console.log('Connected to MongoDB, listening on port', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })
// functions
async function run() {
  try {
    const database = client.db('listingData');
    const listings = database.collection('listings');
    // Query for a movie that has the title 'Back to the Future'
    const query = { _id: new ObjectId('64b210c45e721edc5a109e26') };
    const listing = await listings.findOne(query);
    console.log(listing);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// endpoints/routes
app.get('/', async (req, res) => {
  const {SteamID, Profile} = req.body
  try {
    const user = await User.create({SteamID, Profile})
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})
app.get('/retrieveURL', (req, res) => {
  res.send(connectionString)
})
//run().catch(console.dir);