import { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

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

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            const url = new URL(
                '/shop/products', 'http://localhost:8080'
            );
            url.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            );
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

            try {
                const response = await fetch(url.href);
                const json = await response.json();

                setData(json.data);
                setCategoriesList(json.meta.categoriesList);
                setBrandsList(json.meta.brandsList);

                setRowCount(json.meta.totalRowCount);

                let minMaxValue = json.meta.minMaxPrice;

                if (!minMaxValue.min) {
                    minMaxValue.min = 0
                }
                if (!minMaxValue.max) {
                    minMaxValue.max = 0
                }

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