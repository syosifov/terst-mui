const API_URL = "http://localhost:8080";

export const getProducts = async (pagination, columnFilters, globalFilter, sorting) => {

    const url = new URL(
        '/shop/products', API_URL
    );
    url.searchParams.set(
        'start',
        `${pagination.pageIndex * pagination.pageSize}`,
    );
    url.searchParams.set('size', `${pagination.pageSize}`);
    url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
    url.searchParams.set('globalFilter', globalFilter ?? '');
    url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

    return await fetch(url.href);

}

export const getProductsById = async (idsArray) => {

    const url = new URL(
        '/shop/products-by-id', API_URL
    );
    url.searchParams.set('ids', JSON.stringify(idsArray));

    return await fetch(url.href);

}