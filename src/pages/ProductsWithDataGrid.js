import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';

import {

    Typography,
    IconButton,
} from "@mui/material";



import { data, getPageData, nPages, DEFAULT_PAGE_SIZE } from "../db/data.js";



const renderTitleCell = (data) => {
    // console.log(data);
    return (
        <IconButton
            color="primary"

        >
            <Typography>
                {data.row.title}
            </Typography>
        </IconButton>
    )

}

//product fields:
// {
//     "id": 1,
//     "title": "Essence Mascara Lash Princess",
//     "category": "beauty",
//     "price": 9.99,
//     "rating": 4.94,
//     "brand": "Essence"
// }
const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        editable: true,
        sortable: false,
        renderCell: renderTitleCell
    },
    {
        field: 'category',
        headerName: 'Category',
        flex: 1,
        editable: true,
        sortable: false
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        flex: 1,
        editable: true,
    },
    {
        field: 'rating',
        headerName: 'Rating',
        type: 'number',
        flex: 1,
        editable: true,
    },
    {
        field: 'brand',
        headerName: 'Brand',
        sortable: false,
        flex: 1,

    },
];


function Products() {

    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        setProducts(data.products)
    }, [])

    const handleClick = (params, event, details) => {

        navigate("/product-details/" + params.id);
    }

    return (
        <Box sx={{ height: 700, width: '100%' }}>
            <DataGrid
                onRowClick={handleClick}

                rows={products}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: DEFAULT_PAGE_SIZE,
                        },
                    },
                }}
                
                pageSizeOptions={[DEFAULT_PAGE_SIZE]}
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default Products