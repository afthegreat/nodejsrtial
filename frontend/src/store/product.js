import { create } from "zustand";


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
set((state)=> ({products: [...state.products, data.data]}))

return {success:true , message:"product created successfully"}
}
,
fetchProducts: async () => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();

    if (!res.ok || !data.success || !Array.isArray(data.data)) {
      console.warn("No products or fetch error:", data.message);
      set({ products: [] }); // fallback to empty array
      return;
    }

    set({ products: data.data });
  } catch (error) {
    console.error("Fetch error:", error);
    set({ products: [] }); // fallback on error
  }
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
  
  }
}));

