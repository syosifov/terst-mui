import { data as dbData } from "./data.js";

const allProducts = dbData.products;

const filterProductsByPrice = (products, minMaxValues) => {

    const min = minMaxValues[0];
    const max = minMaxValues[1];

    return products.filter((product) => {

        return product.price > min && product.price < max;

    })

}

const filterProductsByCategory = (products, value) => products.filter((p) => p.category == value);

const filterProducts = (products, field, value) => {

    // console.log(typeof value);

    return products.filter((product) => {

        let prop = product[field];

        //some products don't have brand
        if (!prop) {
            prop = "";
        }

        return prop.toString().toLowerCase().includes(value.toLowerCase());

    })



}

const getMinMaxPrice = (products) => {

    // console.log(typeof value);

    const allPrices = products.map((p) => p.price);
    let max = Math.max(...allPrices);
    let min = Math.min(...allPrices);

    const stepSize = (max - min) / 30;


    return { min, max, stepSize };
}

const getCategoriesList = (products) => {

    let categoriesList = Array.from(new Set(products.map(p => p.category)));

    return categoriesList;
}


const createSortComparator = (sortField, desc) => {


    if (!desc) {

        return (a, b) => {

            return a[sortField] - b[sortField];

        }

    } else {

        return (a, b) => {

            return b[sortField] - a[sortField]

        }

    }

}


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
    console.log("filters:");
    console.log(filters);
    // console.log("globalFilter:");
    // console.log(globalFilter);
    // console.log("sorting:");
    // console.log(sorting);

    let data = allProducts;
    let meta = {};


    const priceFilter = filters.find((filter) => filter.id == "price");

    if (priceFilter) {

        let filteredData = [...data];

        filters.forEach((filter) => {

            const { id: field, value } = filter;
            if (field == "price") {
                return;
            }
            filteredData = filterProducts(filteredData, field, value);
        })
        const minMaxPrice = getMinMaxPrice(filteredData);
        meta.minMaxPrice = minMaxPrice;

    }

    const categoryFilter = filters.find((filter) => filter.id == "category");

    if (categoryFilter) {

        let filteredData = [...data];

        filters.forEach((filter) => {

            const { id: field, value } = filter;
            if (field == "category") {
                return;
            }
            filteredData = filterProductsByCategory(filteredData, value);
        })
        const categoriesList = getCategoriesList(filteredData);
        meta.categoriesList = categoriesList;

    }

    filters.forEach((filter) => {

        const { id: field, value } = filter;
        if (field == "price") {
            
            data = filterProductsByPrice(data, value);

        }else if(field == "category"){

            data = filterProductsByCategory(data, value);

        }else{

            data = filterProducts(data, field, value);

        }
        
    })

    if(!priceFilter){
        const minMaxPrice = getMinMaxPrice(data);
        meta.minMaxPrice = minMaxPrice;
    }
    if(!categoryFilter){
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

