import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductsWithDataGrid from "./pages/ProductsWithDataGrid";
import ProductsWithMaterialTable from "./pages/ProductsWithMaterialTable";
import Products from "./pages/Products";
import PageNotFound from "./pages/PageNotFound"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
