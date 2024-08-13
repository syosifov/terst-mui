import React from 'react'
import { useParams } from "react-router-dom"

function ProductDetails() {
  const { id } = useParams();
  return (
    <>
      <h1>Product Details</h1>
      <h2> {id} </h2>
    </>
  )
}

export default ProductDetails