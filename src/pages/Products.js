import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Button,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  Grid,
} from "@mui/material";

import { paperStyle } from "./styles";


import { data } from "../db/data"

function Products() {
  const [products, setProducts] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(data.products)
    console.log(data)
  }, [])

  return (
    <>
      <Paper elevation={10} style={paperStyle} >
        <TableContainer sx={{ border: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key="title">Title</TableCell>
                <TableCell key="category">Category</TableCell>
                <TableCell key={"price"}>Price</TableCell>
                <TableCell key={"rating"}>Rating</TableCell>
                <TableCell key={"brand"}>Brand</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.products.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            navigate("/product-details/" + row.id);
                          }}
                        >
                          <Typography>
                            {row.title}
                          </Typography>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.category}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>{row.price}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>{row.rating}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.brand}</Typography>
                      </TableCell>
                    </TableRow>
                  )
                })
              }

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default Products