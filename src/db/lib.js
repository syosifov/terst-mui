const filterProductsByPrice = (products, minMaxValues) => {

    const min = minMaxValues[0];
    const max = minMaxValues[1];


    return products.filter((product) => {

        return product.price >= min && product.price <= max;

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

const getFilteredDataForField = (data, field, value) => {

    if (field == "price") {

        return filterProductsByPrice(data, value);

    } else if (field == "category") {

        return filterProductsByCategory(data, value);

    } else {

        return filterProducts(data, field, value);

    }
}

//apply all filters
const getFilteredDataForEveryField = (data, filters) => {

    let filteredData = data;

    filters.forEach((filter) => {

        const { id: field, value } = filter;
        filteredData = getFilteredDataForField(filteredData, field, value);

    })

    return filteredData;
}

const getFilteredDataForEveryFieldExceptOne = (data, filters, dontFilterField) => {

    let filteredData = data;

    filters.forEach((filter) => {

        const { id: field, value } = filter;
        if (field == dontFilterField) {
            return;
        }
        filteredData = getFilteredDataForField(filteredData, field, value);
    })

    return filteredData;


}

export {
    filterProductsByPrice,
    filterProductsByCategory,
    filterProducts,
    getMinMaxPrice,
    getCategoriesList,
    createSortComparator,
    getFilteredDataForField,
    getFilteredDataForEveryField,
    getFilteredDataForEveryFieldExceptOne

}