import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductsWithDataGrid from "./pages/ProductsWithDataGrid";
import ProductsWithMaterialTable from "./pages/ProductsWithMaterialTable";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Payment from "./pages/Payment/Payment";
import Completion from "./pages/Payment/Completion";
import GenerateQR from "./pages/GenerateQR";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products-datagrid" element={<ProductsWithDataGrid />} />
          <Route path="/products-materialtable" element={<ProductsWithMaterialTable />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />

          {/* <Route path="/shopping-cart" element={<ShoppingCart />} /> */}

          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />

          <Route path="/qr-code" element={<GenerateQR />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
