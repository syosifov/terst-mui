import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import { getProducts } from '../db/test-api';

const Example = () => {
    //data and fetching state
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!data.length) {
    //             setIsLoading(true);
    //         } else {
    //             setIsRefetching(true);
    //         }

    //         const url = new URL(
    //             '/api/data', 'http://localhost:3000'
    //         );
    //         url.searchParams.set(
    //             'start',
    //             `${pagination.pageIndex * pagination.pageSize}`,
    //         );
    //         url.searchParams.set('size', `${pagination.pageSize}`);
    //         url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    //         url.searchParams.set('globalFilter', globalFilter ?? '');
    //         url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

    //         try {
    //             const response = await fetch(url.href);
    //             const json = await response.json();
    //             setData(json.data);
    //             setRowCount(json.meta.totalRowCount);
    //         } catch (error) {
    //             setIsError(true);
    //             console.error(error);
    //             return;
    //         }
    //         setIsError(false);
    //         setIsLoading(false);
    //         setIsRefetching(false);
    //     };
    //     fetchData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [
    //     columnFilters,
    //     globalFilter,
    //     pagination.pageIndex,
    //     pagination.pageSize,
    //     sorting,
    // ]);

    useEffect(() => {

        const url = new URL(
            '/api/data', 'http://localhost:3000'
        );
        url.searchParams.set(
            'start',
            `${pagination.pageIndex * pagination.pageSize}`,
        );
        url.searchParams.set('size', `${pagination.pageSize}`);
        url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
        url.searchParams.set('globalFilter', globalFilter ?? '');
        url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        const json = getProducts(url);
        setData(json.data);
        setRowCount(json.meta.totalRowCount);



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
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'price',
                header: 'Price',
            },
            {
                accessorKey: 'rating',
                header: 'Rating',
            },
            {
                accessorKey: 'brand',
                header: 'Brand',
            },
            //column definitions...
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        // enableRowSelection: true,
        getRowId: (row) => row.phoneNumber,
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
        },
    });

    return <MaterialReactTable table={table} />;
};

export default Example;