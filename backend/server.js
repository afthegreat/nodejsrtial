import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from '/models/productModel.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/products', async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({
      _id: newProduct._id,
      name: newProduct.name,
      image: newProduct.image,
      price: newProduct.price,
    });
  } catch (error) {
    console.error("Error creating the product:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
