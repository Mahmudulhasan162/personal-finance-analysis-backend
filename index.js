const express= require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

//middleware
app.use(cors())
app.use(express.json());




    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbshjw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    async function run() {
      try {
        await client.connect();

        const database = client.db('financeTrackerDB');
        const incomeCollection = database.collection('incomes');

        app.post('/api/income', async(req, res) => {
            const incomeData = req.body;
            const result = await incomeCollection.insertOne(incomeData)
            res.send(result)
            console.log(`New income entry created with the following id: ${result.insertedId}`);
        });
        
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        //await client.close();
      }
    }
    run().catch(console.dir);
    app.get('/',(req,res)=>{
        res.send("Server site is running")
        })
    app.listen(port, ()=>{
        console.log(`Server site is running on port ${port}`);
        })
    