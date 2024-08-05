import { data as dbData } from "./data.js";

const allProducts = dbData.products;



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
    // console.log("filters:");
    // console.log(filters);
    // console.log("globalFilter:");
    // console.log(globalFilter);
    console.log("sorting:");
    console.log(sorting);

    let data = allProducts;

    filters.forEach((filter) => {

        const { id: field, value } = filter;
        data = filterProducts(data, field, value);
    })


    const totalRowCount = data.length;

    if (sorting[0]) {

        const { id: sortField, desc } = sorting[0];
        const sortComparator = createSortComparator(sortField, desc);
        data = data.sort(sortComparator);

    }

    data = data.slice(start, start + size);



    const response = {
        data,
        meta: {
            totalRowCount
        }
    }

    return response
}

