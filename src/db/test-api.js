import { data as dbData } from "./data.js";

const allProducts = dbData.products;

export const getProducts = (url) => {

    const start = Number.parseInt(url.searchParams.get("start"));
    const size = Number.parseInt(url.searchParams.get("size"));
    const filters = url.searchParams.get("filters");
    const globalFilter = url.searchParams.get("globalFilter");
    const sorting = url.searchParams.get("sorting");


    console.log("start:");
    console.log(start);
    console.log("size:");
    console.log(size);
    console.log("filters:");
    console.log(filters);
    console.log("globalFilter:");
    console.log(globalFilter);
    console.log("sorting:");
    console.log(sorting);
    
    const data = allProducts.slice(start, start + size);

    const totalRowCount = allProducts.length;

    //todo: add logic

    

    const response = {
        data,
        meta: {
            totalRowCount
        }
    }

    return response
}

