import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { useNavigate } from "react-router-dom";

import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';

import {

    Typography,
    IconButton,
} from "@mui/material";

import { getProducts, getProductsById } from '../functions/product';


const PRICE_STEP = 30;

const Example = () => {
    //data and fetching state
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    const [minMaxPrice, setMinMaxPrice] = useState({ min: 0, max: 0, stepSize: 0 });
    const [categoriesList, setCategoriesList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);


    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const navigate = useNavigate();


    //Use rowSelection state if you are using server-side pagination. 
    //https://www.material-react-table.com/docs/guides/row-selection
    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        // console.log({ rowSelection }); //read your managed row selection state
        // console.info(table.getState().rowSelection); //alternate way to get the row selection state
    }, [rowSelection]);

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            try {
                const response = await getProducts(pagination, columnFilters, globalFilter, sorting);
                const json = await response.json();

                setData(json.data);
                setCategoriesList(json.meta.categoriesList);
                setBrandsList(json.meta.brandsList);

                setRowCount(json.meta.totalRowCount);

                let minMaxValue = json.meta.minMaxPrice;

                minMaxValue.stepSize = (minMaxValue.max - minMaxValue.min) / PRICE_STEP;

                setMinMaxPrice(minMaxValue);

            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
    ]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'title',
                header: 'Title',
                Cell: ({ cell }) => {
                    return (
                        <IconButton onClick={() => {
                            const id = cell.row.original.id;
                            navigate("/product-details/" + id);
                        }}
                            color="primary"
                        >
                            <Typography>
                                {cell.getValue()}
                            </Typography>
                        </IconButton>
                    )
                }
            },
            {
                accessorKey: 'category',
                header: 'Category',
                filterVariant: 'select',
                filterSelectOptions: categoriesList, //custom options list
            },
            {
                accessorKey: 'price',
                header: 'Price',
                Cell: ({ cell }) =>
                    cell.getValue().toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }),
                filterVariant: 'range-slider',
                filterFn: 'betweenInclusive', // default (or between)
                muiFilterSliderProps: {
                    marks: true,
                    max: minMaxPrice.max,
                    min: minMaxPrice.min,
                    step: minMaxPrice.stepSize ? minMaxPrice.stepSize : 100,
                    valueLabelFormat: (value) =>
                        value.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }),
                },
            },
            {
                accessorKey: 'rating',
                header: 'Rating',
            },
            {
                accessorKey: 'brand',
                header: 'Brand',
                filterVariant: 'multi-select',
                filterSelectOptions: brandsList, //custom options list
            },
            //column definitions...
        ],
        [minMaxPrice, categoriesList, brandsList],
    );

    //doesn't work with server side pagination because data gets lost
    // const handleExportRows = (rows) => {
    //     const doc = new jsPDF();
    //     const tableData = rows.map((row) => Object.values(row.original));
    //     const tableHeaders = columns.map((c) => c.header);

    //     autoTable(doc, {
    //         head: [tableHeaders],
    //         body: tableData,
    //     });

    //     doc.save('mrt-pdf-example.pdf');
    // };

    const handleExportRows = async () => {


        // rowSelection = {1: true, 7: true}
        const idsArray = Object.keys(rowSelection);

        const response = await getProductsById(idsArray);
        const products = await response.json();

        const tableData = products.map((row) => Object.values(row));
        const tableHeaders = columns.map((c) => c.header);

        const doc = new jsPDF();
        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
        });

        doc.save('mrt-pdf-example.pdf');
    };

    const table = useMaterialReactTable({

        columns,
        data,

        enableRowSelection: true,
        getRowId: (row) => row.id, //give each row a more useful id
        onRowSelectionChange: setRowSelection, //connect internal row selection state to your own
        // columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                {/* <Button
                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() =>
                        handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                >
                    Export All Rows
                </Button> */}
                <Button
                    disabled={table.getRowModel().rows.length === 0}
                    //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    Export Page Rows
                </Button>
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                    }

                    //table.getSelectedRowModel().rows only really works with client-side pagination. 
                    //Use rowSelection state if you are using server-side pagination. 
                    //Row Models only contain rows based on the data you pass in.

                    //TODO write server function to get products based on ID
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                >
                    Export Selected Rows
                </Button>
            </Box>
        ),

        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount,

        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection //pass our managed row selection state to the table to use
        },
    });

    return <MaterialReactTable table={table} />;
};

export default Example;