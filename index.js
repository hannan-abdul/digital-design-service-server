const express = require('express')
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
const port = process.env.PORT || 5050;
const services = require("./routes/services")
const reviews = require("./routes/reviews")
const auth = require("./routes/auth")

dotenv.config()
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// All Routes
app.use("/api/services", services)
app.use("/api/reviews", reviews)
app.use("/api/auth", auth)


app.get('/', (req, res) => {
  res.send('Digital Design Server')
})

app.listen(port, () => {
  console.log(`${port}`, 'server connected')
})


