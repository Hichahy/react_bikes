const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const app = express();

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


  mongoose.connect("mongodb://localhost/bikes-db", {
    useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
    
    });

const Product = mongoose.model(
  "bikes",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    tittle: String,
    description: String,
    image: String,
    price: Number,
    availableSizesz: [String],
  })
);

app.get("/api/bikes", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/bikes", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  });

app.delete("/api/bikes/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serv at http://localhost:5000"));
