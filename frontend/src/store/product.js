import { create } from "zustand";
import mongoose from "mongoose";

export const useProductStore = create((set) => ({
    products:[],
    setProducts: (products) => set({ products }),

createProducts: async (newProduct)=>  {
if(!newProduct.name || !newProduct.price || !newProduct.image){
  return {success: false, message: "fill out all the forms"}
}
const res =await fetch("/api/products",{
    method: "POST",
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct)
})
const data= await res.json()
set((state)=> ({products: [...state.products , data.data]}))

return {success:true , message:"product created successfully"}
}
,
fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
},
 deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message };
  },
 updateProduct: async (pid, updatedProduct) => {
  try {
    // Make the PUT request to update the product
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    // Try to parse JSON response
    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      return {
        success: false,
        message: "Failed to parse server response. Possibly a server error.",
      };
    }

    // Handle response errors
    if (!res.ok || !data.success) {
      return {
        success: false,
        message: data?.message || "Failed to update the product",
      };
    }

    // Update Zustand store state
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? { ...product, ...data.data } : product
      ),
    }));

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    // Catch any unexpected errors
    console.error("Update product error:", error);
    return {
      success: false,
      message: "Unexpected error while updating product",
    };
  }
},

}));

