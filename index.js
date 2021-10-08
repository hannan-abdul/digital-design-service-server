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
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("homeRenovation").collection("renovationService");
  const reviewsCollection = client.db("homeRenovation").collection("reviews");
  
  //read reviews
  app.get('/reviews', (req, res) => {
    reviewsCollection.find({})
      .toArray((err, items) => {
        res.send(items)
      })
  })
//post reviews
  app.post('/addReview', (req, res) => {
    const newReview = req.body;
    console.log('adding new product', newReview)
    reviewsCollection.insertOne(newReview)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  // delete reviews
  app.delete('/deletereview/:id', (req, res) => {
    console.log(req.params.id);
    reviewsCollection.deleteOne({_id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })

  // read services 
  app.get('/services', (req, res) => {
    serviceCollection.find({})
      .toArray((err, items) => {
        res.send(items)
      })
  })
// post services
  app.post('/addService', (req, res) => {
    const newService = req.body;
    console.log('adding new product', newService)
    serviceCollection.insertOne(newService)
      .then(result => {
        console.log('inserted count', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })
  
// delete service
  app.delete('/delete/:id', (req, res) => {
    console.log(req.params.id);
    serviceCollection.deleteOne({_id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0);
      })
  })

  //update service
  app.put('/update/:id', (req, res) => {
    const updatedItem = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        imageURL: req.body.imageURL,
    };
    console.log(req.body);
    serviceCollection.updateOne({ _id: ObjectId(req.params.id) },
        { $set: updatedItem })
        .then(result => {
            res.send(result.modifiedCount > 0)
        })
  })

  console.log('database connected')
});


app.listen(process.env.PORT || port)