import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
// import Products from "./pages/Products";
import Products from "./pages/ProductsWithDataGrid";
import PageNotFound from "./pages/PageNotFound"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
