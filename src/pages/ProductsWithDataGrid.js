import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';

import { paperStyle } from "./styles";


import { data, getPageData, nPages, DEFAULT_PAGE_SIZE } from "../db/data.js";

console.log(data);

// {
//     "id": 1,
//     "title": "Essence Mascara Lash Princess",
//     "category": "beauty",
//     "price": 9.99,
//     "rating": 4.94,
//     "brand": "Essence"
// }

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        editable: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        flex: 1,
        editable: true,
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
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];


function Products() {

    const [products, setProducts] = useState(null)

    useEffect(() => {

        setProducts(data.products)
    }, [])


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={products}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default Products