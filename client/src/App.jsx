import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Category, AddProduct, Cart } from "./Pages/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <div className="font-mono bg-[#f5f5f5] flex min-h-screen flex-col">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
