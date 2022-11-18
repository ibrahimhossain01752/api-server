const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const ObjectId = require("mongodb").ObjectId;
const cors = require('cors');

const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.638jm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.connect((err) => {
    
    const usersCollection = client.db("api").collection("users");

    app.get("/users", async (req, res) => {
        const result = await usersCollection.find({}).toArray();
        res.send(result);
      });
    
    
      // single service........................
     app.get("/users/:id", async (req, res) => {
      const result = await usersCollection.find({_id: ObjectId(req.params.id)}).toArray();
      res.send(result);
     });
 

});

app.listen(process.env.PORT || port); 






