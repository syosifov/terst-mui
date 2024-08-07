import { data as dbData } from "./data.js";

import {

    getMinMaxPrice,
    getCategoriesList,
    createSortComparator,
    getFilteredDataForEveryField,
    getFilteredDataForEveryFieldExceptOne

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

    let data = allProducts;
    let meta = {};


    const priceFilter = filters.find((filter) => filter.id == "price");

    if (priceFilter) {

        let filteredData = getFilteredDataForEveryFieldExceptOne(data, filters, "price");
        const minMaxPrice = getMinMaxPrice(filteredData);
        meta.minMaxPrice = minMaxPrice;

    }

    const categoryFilter = filters.find((filter) => filter.id == "category");

    if (categoryFilter) {

        let filteredData = getFilteredDataForEveryFieldExceptOne(data, filters, "category");
        const categoriesList = getCategoriesList(filteredData);
        meta.categoriesList = categoriesList;

    }

    data = getFilteredDataForEveryField(data, filters);
    

    if (!priceFilter) {
        const minMaxPrice = getMinMaxPrice(data);
        meta.minMaxPrice = minMaxPrice;
    }
    if (!categoryFilter) {
        const categoriesList = getCategoriesList(data);
        meta.categoriesList = categoriesList;
    }

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

