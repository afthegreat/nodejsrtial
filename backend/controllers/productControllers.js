import mongoose from 'mongoose';
import Product from '../models/poductModel.js';
const addProduct=async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct
    });
  } catch (error) {
    console.error("Error creating the product:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


const deleteProduct= async (req, res) => {
  const id= req.params.id;
console.log(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({success:true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting the product:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }}



  const findProduct= async (req, res) => {
 try {
   const products = await Product.find();
   if(products.length === 0) {
     return res.status(200).json({success: true, message: 'No products found' });
   }
  
   res.status(200).json({ success: true, data: products }); 
}
catch (error) {
   console.error("Error fetching products:", error);
   res.status(500).json({ success: false, message: 'Server error' });
  }
}


const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  console.log("➡️ Update request received");
  console.log("🆔 Product ID:", id);
  console.log("📦 Product data:", product);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ Invalid ID");
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    if (!updatedProduct) {
      console.log("❌ Product not found in DB");
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log("✅ Product updated:", updatedProduct);
    res.status(200).json({ success: true, data: updatedProduct });

  } catch (error) {
    console.error("🔥 Error updating the product:", error.message);
    console.error("🧱 Stack trace:", error.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



export { addProduct, deleteProduct, findProduct, updateProduct };