import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes)
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
})
