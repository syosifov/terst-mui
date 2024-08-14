// import {
// 	ReasonPhrases,
// 	StatusCodes,
// 	getReasonPhrase,
// 	getStatusCode,
// } from 'http-status-codes';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { Op } = require('sequelize');

const Product = require("../models/product")

const getMinMaxPrice = (products) => {

    // console.log(typeof value);

    if (!products.length) {

        console.log("no products")
        return { min: 0, max: 0, stepSize: 0 };
    }

    const allPrices = products.map((p) => p.price);
    let max = Math.max(...allPrices);
    let min = Math.min(...allPrices);

    const stepSize = (max - min) / 30;


    return { min, max, stepSize };
}

exports.getProducts = async (req, res, next) => {

    console.log(req.query);
    const start = Number.parseInt(req.query["start"]);
    const size = Number.parseInt(req.query["size"]);
    const filters = JSON.parse(req.query["filters"]);
    const globalFilter = req.query["globalFilter"];
    const sorting = JSON.parse(req.query["sorting"]);

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

    // console.log(data);
    // TODO:
    // Add sorting
    // Add pagination
    // Add filtering

    const brandsFilter = filters.find((filter) => filter.id == "brand");
    const categoryFilter = filters.find((filter) => filter.id == "category");
    const titleFilter = filters.find((filter) => filter.id == "title");

    const titleFilterString = titleFilter ? titleFilter.value : "";
    const categoryFilterString = categoryFilter ? categoryFilter.value : "";
    const brandsFilterArray = brandsFilter ? brandsFilter.value : [];

    const filterClauese = {};
    if (categoryFilter) {

        filterClauese.category = {
            [Op.eq]: categoryFilterString,
        }
    }

    if (brandsFilter) {

        filterClauese.brand = { [Op.in]: brandsFilterArray }
    }

    let data = await Product.findAll({
        where: {
            [Op.or]: {
                title: {
                    [Op.like]: '%' + globalFilter + '%',
                },
                category: {
                    [Op.like]: '%' + globalFilter + '%'
                },
                brand: {
                    [Op.like]: '%' + globalFilter + '%'
                },

            },
            [Op.and]: {

                title: {
                    [Op.like]: '%' + titleFilterString + '%',
                },

                ...filterClauese

            },

        },
    });

    data = data.slice(start, start + size);

    let meta = {}

    const minMaxPrice = getMinMaxPrice(data);
    meta.minMaxPrice = minMaxPrice;

    meta.categoriesList = await Product.findAll({
        attributes: ['category'],
        group: ['category']
    }).then(product =>
        product.map(product => product.category)
    );

    meta.brandsList = await Product.findAll({
        attributes: ['brand'],
        group: ['brand']
    }).then(product =>
        product.map(product => product.brand)
    );

    const response = {
        data,
        meta
    }

    return res.status(StatusCodes.OK).json(response);
}