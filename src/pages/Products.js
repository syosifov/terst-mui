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

import Pagination from '@mui/material/Pagination';

import { paperStyle } from "./styles";


import { data } from "../db/data";


function Products() {
    const [products, setProducts] = useState(null)
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);

    const handleChange = (event, value) => {
        

        setPage(value);
    };

    useEffect(() => {
        setProducts(data.products)
        console.log(data)
    }, [])

    useEffect(() => {
        
        //call api
    }, [page])

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
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '20vh' }}
            >
                <Grid item xs={3}>
                    <Pagination count={10} page={page} onChange={handleChange} />
                </Grid>
            </Grid>

        </>
    )
}

export default Products