import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';

import {

    Typography,
    IconButton,
} from "@mui/material";



import { data, getPageData, nPages, nProducts, DEFAULT_PAGE_SIZE, getSortedData } from "../db/data.js";



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
        editable: true,
        flex: 1,

    },
];


function Products() {

    const [products, setProducts] = useState(null);


    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: DEFAULT_PAGE_SIZE,
    });
    const [sortModel, setSortModel] = useState([]);

    const navigate = useNavigate();

    const nRows = nProducts(data.products);

    // useEffect(() => {

    //     setProducts(data.products)
    // }, [])

    useEffect(() => {

        // console.log("paginationModel");
        // console.log(paginationModel);
        // console.log("sortModal")
        // console.log(sortModel);

        if (sortModel[0]) {

            const page = paginationModel.page + 1;
            const sortOrder = sortModel[0].sort;
            console.log("sort order");
            console.log(sortOrder);
            const sortField = sortModel[0].field;

            const productsData = getSortedData(page, data.products, sortField, sortOrder, DEFAULT_PAGE_SIZE);

            console.log("products data")
            console.log(productsData)
            setProducts(productsData);

        } else {

            const page = paginationModel.page + 1;
            const productsData = getPageData(page, data.products, DEFAULT_PAGE_SIZE);
            console.log("products data")
            console.log(productsData)
            setProducts(productsData);

        }


    }, [paginationModel, sortModel]);



    const handleClick = (params, event, details) => {

        navigate("/product-details/" + params.id);
    }

    return (
        <Box sx={{ height: 700, width: '100%' }}>
            <DataGrid
                onRowClick={handleClick}

                rows={products}
                columns={columns}
                sortingMode="server"
                pagination
                paginationMode="server"
                pageSizeOptions={[DEFAULT_PAGE_SIZE]}
                paginationModel={paginationModel}
                rowCount={nRows} // Assumes API returns total count

                onPaginationModelChange={setPaginationModel}
                onSortModelChange={setSortModel}
                // checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default Products