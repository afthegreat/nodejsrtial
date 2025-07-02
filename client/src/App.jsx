import { Route, Routes } from "react-router-dom"
import AuthLogin from './pages/auth/login.jsx'
import AuthRegister from "./pages/auth/register.jsx"
import AuthLayout from "./components/auth/layout"
import AdminLayout from "./components/admin-view/AdminLayout.jsx"
import AdminProducts from "./pages/admin-view/products.jsx"
import AdminOrders from "./pages/admin-view/orders.jsx"
import AdminDashboard from "./pages/admin-view/dashboard.jsx"
import AdminFeatures from "./pages/admin-view/features.jsx"

function App() {

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
    
        <Route path="/auth" element={<AuthLayout/>}>
        <Route path="login" element={<AuthLogin/>} />
        <Route path="register" element={<AuthRegister/>}/>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}> 
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures/>} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
