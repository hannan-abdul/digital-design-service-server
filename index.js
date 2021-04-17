const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5055;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Home Renovation server')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4ko6w.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(process.env.DB_NAME)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("homeRenovation").collection("renovationService");
  const reviewsCollection = client.db("homeRenovation").collection("reviews");
  
  app.get('/reviews', (req, res) => {
    reviewsCollection.find({})
      .toArray((err, items) => {
        res.send(items)
      })
  })

  app.post('/addReview', (req, res) => {
    const newReview = req.body;
    console.log('adding new product', newReview)
    reviewsCollection.insertOne(newReview)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/services', (req, res) => {
    serviceCollection.find({})
      .toArray((err, items) => {
        res.send(items)
      })
  })

  app.post('/addService', (req, res) => {
    const newService = req.body;
    console.log('adding new product', newService)
    serviceCollection.insertOne(newService)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })
  console.log('database connected')

  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    serviceCollection.deleteOne({_id: ObjectID(req.params.id) })
      .then(result => {
        // console.log(result)
        res.send(result.deletedCount > 0);
      })
  })

});




app.listen(process.env.PORT || port)