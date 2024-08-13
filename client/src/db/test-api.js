import { data as dbData } from "./data.js";

import {

    getMinMaxPrice,
    getCategoriesList,
    getBrandsList,
    createSortComparator,
    getFilteredDataForEveryField,
    getFilteredDataForEveryFieldExceptOne,
    getFilteredDataForGlobalFilter

} from "./lib.js"


const allProducts = dbData.products;




//todo add different filters
// https://www.material-react-table.com/docs/guides/column-filtering
export const getProducts = (url) => {

    const start = Number.parseInt(url.searchParams.get("start"));
    const size = Number.parseInt(url.searchParams.get("size"));
    const filters = JSON.parse(url.searchParams.getAll("filters"));
    const globalFilter = url.searchParams.get("globalFilter");
    const sorting = JSON.parse(url.searchParams.getAll("sorting"));

    // console.log("start:");
    // console.log(start);
    // console.log("size:");
    // console.log(size);
    // console.log("filters:");
    // console.log(filters);
    // console.log("globalFilter:");
    // console.log(globalFilter);
    // console.log("sorting:");
    // console.log(sorting);

    let unfilteredData = allProducts;

    let filteredDataWithGlobalFilter = getFilteredDataForGlobalFilter(unfilteredData, globalFilter);

    let filteredDataForAllFields = getFilteredDataForEveryField(unfilteredData, filters);
    
    filteredDataForAllFields = getFilteredDataForGlobalFilter(filteredDataForAllFields, globalFilter);

    let meta = {};


    const priceFilter = filters.find((filter) => filter.id == "price");

    if (priceFilter) {

        let filteredData = getFilteredDataForEveryFieldExceptOne(filteredDataWithGlobalFilter, filters, "price");
        const minMaxPrice = getMinMaxPrice(filteredData);
        meta.minMaxPrice = minMaxPrice;

    }else{

        const minMaxPrice = getMinMaxPrice(filteredDataForAllFields);
        meta.minMaxPrice = minMaxPrice;
    }

    const categoryFilter = filters.find((filter) => filter.id == "category");

    if (categoryFilter) {

        let filteredData = getFilteredDataForEveryFieldExceptOne(filteredDataWithGlobalFilter, filters, "category");
        const categoriesList = getCategoriesList(filteredData);
        meta.categoriesList = categoriesList;

    }else{
        const categoriesList = getCategoriesList(filteredDataForAllFields);
        meta.categoriesList = categoriesList;

    }

    const brandsFilter = filters.find((filter) => filter.id == "brand");

    if (brandsFilter) {

        let filteredData = getFilteredDataForEveryFieldExceptOne(filteredDataWithGlobalFilter, filters, "brand");
        const brandsList = getBrandsList(filteredData);
        meta.brandsList = brandsList;

    }else{

        const brandsList = getBrandsList(filteredDataForAllFields);
        meta.brandsList = brandsList;
    }

    

    let data = filteredDataForAllFields;
    const totalRowCount = data.length;
    meta.totalRowCount = totalRowCount;

    if (sorting[0]) {

        const { id: sortField, desc } = sorting[0];
        const sortComparator = createSortComparator(sortField, desc);
        data = data.sort(sortComparator);

    }

    data = data.slice(start, start + size);

    const response = {
        data,
        meta
    }

    return response
}

