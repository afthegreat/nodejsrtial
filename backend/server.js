import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);


// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'..', 'frontend', 'dist')));
 app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'frontend', 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
