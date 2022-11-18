const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const ObjectId = require("mongodb").ObjectId;
const cors = require('cors');

const uri = "mongodb+srv://api_server:zEh5BWUp4syP50KA@cluster0.638jm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



async function run(){
    try{
        await client.connect();
       
       const database = client.db('api');
   
       const usersCollection = database.collection('users');
       const bookingCollection = database.collection('bookingCollection');
      
       app.use('/users', async (req, res) => {
        console.log(req.body);
        const result = await usersCollection.find({}).toArray();
        console.log(result);
        res.send(result);
    })

    app.post('/Addusers', async (req, res) => {
        console.log(req.body);
        const result = await bookingCollection.insertOne(req.body);
        res.send(result);
    })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir); 

app.get('/', (req, res) => {
        res.send('running beauti server');
 })

app.listen(port,() => {
    console.log('running the server',port);
 })
 





