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
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting the product:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }}



  const findProduct= async (req, res) => {
 try {
   const products = await Product.find();
   if(products.length === 0) {
     return res.status(404).json({ message: 'No products found' });
   }
   if (!products) {
     return res.status(404).json({ message: 'No products found' });
   }
   res.status(200).json({ success: true, data: products }); 
}
catch (error) {
   console.error("Error fetching products:", error);
   res.status(500).json({ success: false, message: 'Server error' });
  }
}


const updateProduct= async (req, res) => {
const id = req.params.id;
if(!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: 'Invalid product ID' });
}
const product = req.body;
const updatedProduct = await Product.findByIdAndUpdate(id,product, {new:true});
if(!updatedProduct) {
  return res.status(400).json({ message: 'No products found' });

}
if(product.length === 0) {
  return res.status(404).json({ message: 'No products found' });
}
res.status(200).json({ success: true, data: updatedProduct });
}


export { addProduct, deleteProduct, findProduct, updateProduct };