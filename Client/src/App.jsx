import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./component/layout/userlayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetails from "./component/products/ProductDetails";
import Checkout from "./component/layout/checkout";
import CollectionsPage from "./pages/CollectionsPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDeatlisPage"; 
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./component/Admin/AdminLayout";
import AdminHomePage from "./component/Admin/AdminHomePage";
import UserManagement from "./component/Admin/UserManagement";
import ProductManagement from "./component/Admin/ProductManagement";
import EditProductPage from "./component/Admin/EditProductPage";
import OrderManagement from "./component/Admin/OrderManagement";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* User Layout Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> {/* ✅ Fixed casing */}
          <Route path="profile" element={<Profile />} /> {/* ✅ Fixed casing */}
          <Route path="collections/:collection" element={<CollectionsPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} /> {/* ✅ More readable URL */}
          <Route path="order-details/:id" element={<OrderDetailsPage />} /> {/* ✅ Fixed casing & better route */}
          <Route path="my-order" element={<MyOrderPage />} />
        </Route>


        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} /> 
          <Route path="Products" element={<ProductManagement />} /> 
          <Route path="Products/:id/edit" element={<EditProductPage />} /> 
          <Route path="orders" element={<OrderManagement />} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
