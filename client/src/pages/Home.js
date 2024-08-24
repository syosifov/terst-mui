import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{"text-align": "center"}}>
      <h1>Welcome</h1>
      <Link to='/products'><h3>Explore our Products</h3></Link>
      <Link to='/products-datagrid'><h3>Explore our Products with Data Grid</h3></Link>
      <Link to='/products-materialtable'><h3>Explore our Products with Material React Table</h3></Link>
      <Link to='/shopping-cart'><h3>Explore our Shopping Cart</h3></Link>

    </div>
  )
}

export default Home