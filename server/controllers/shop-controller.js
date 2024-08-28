// import {
// 	ReasonPhrases,
// 	StatusCodes,
// 	getReasonPhrase,
// 	getStatusCode,
// } from 'http-status-codes';

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { Op, where } = require('sequelize');
const NO_BRAND_STRING = "no brand";

const Product = require("../models/product")

const { mssg } = require("../ChatBot/index");

const createWhereClause = (filters, globalFilter) => {

    const brandsFilter = filters.find((filter) => filter.id == "brand");
    const categoryFilter = filters.find((filter) => filter.id == "category");
    const titleFilter = filters.find((filter) => filter.id == "title");
    const priceFilter = filters.find((filter) => filter.id == "price");

    const titleFilterString = titleFilter ? titleFilter.value : "";

    const filterClauese = {};
    if (categoryFilter) {

        const categoryFilterString = categoryFilter.value;

        filterClauese.category = {
            [Op.eq]: categoryFilterString,
        }
    }

    if (brandsFilter) {

        let brandsFilterArray = brandsFilter.value;
        const hasNullVal = brandsFilterArray.includes(NO_BRAND_STRING);
        //Sequalize doesn't match a null brand with an empty string brand
        brandsFilterArray = brandsFilterArray.filter((val) => val !== NO_BRAND_STRING);

        if (hasNullVal) {
            filterClauese.brand = {
                [Op.or]: [
                    { [Op.in]: brandsFilterArray },
                    { [Op.eq]: null }
                ]



            }
        } else {
            filterClauese.brand = { [Op.in]: brandsFilterArray }
        }

    }

    if (priceFilter) {

        let min = Number(priceFilter.value[0]);
        let max = Number(priceFilter.value[1]);
        filterClauese.price = { [Op.between]: [min, max] }
    }


    const whereClause = {
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

    }

    return whereClause


}

const getUniqueFieldValues = async (field, filters, globalFilter) => {

    const whereClause = createWhereClause(filters, globalFilter);
    delete whereClause[Op.and][field];

    const uniqueValuesList = await Product.findAll({
        where: whereClause,
        attributes: [field],
        group: [field]
    }).then(product =>
        product.map(product => product[field])
    );

    return uniqueValuesList;
}

const getMinMaxFieldValues = async (field, filters, globalFilter) => {

    const whereClause = createWhereClause(filters, globalFilter);
    delete whereClause[Op.and][field];

    const min = await Product.min(field, { where: whereClause });
    const max = await Product.max(field, { where: whereClause });

    return [min, max];
}

exports.getProducts = async (req, res, next) => {

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
    console.log("sorting:");
    console.log(sorting);

    const whereClause = createWhereClause(filters, globalFilter);
    let sortingClause = {};
    if (sorting.length) {
        const sortBy = sorting[0].id;
        const sortOrder = sorting[0].desc ? 'DESC' : 'ASC';
        sortingClause.order = [[sortBy, sortOrder]];
        console.log(sortingClause.order);
    }

    let data = await Product.findAll({
        ...sortingClause,

        where: whereClause,
        offset: start,
        limit: size
    }
    );

    const totalRowCount = await Product.count({
        where: whereClause,
    })

    let meta = {}

    meta.totalRowCount = totalRowCount;

    const priceRange = await getMinMaxFieldValues("price", filters, globalFilter);

    meta.minMaxPrice = {
        min: priceRange[0],
        max: priceRange[1]
    }

    meta.categoriesList = await getUniqueFieldValues("category", filters, globalFilter);
    meta.brandsList = await getUniqueFieldValues("brand", filters, globalFilter);
    //Some products have null value as brand
    if (meta.brandsList.indexOf(null) !== -1) {
        meta.brandsList[meta.brandsList.indexOf(null)] = NO_BRAND_STRING;
    }

    const response = {
        data,
        meta
    }

    return res.status(StatusCodes.OK).json(response);
}

//for pdf export, to export selected products
exports.getProductsById = async (req, res, next) => {

    const idsArray = JSON.parse(req.query["ids"]);

    let data = await Product.findAll({
        attributes: ['title', 'category', 'price', 'rating', 'brand'],
        where: {
            id: {
                [Op.in]: idsArray
            }
        }
    }
    );

    return res.status(StatusCodes.OK).json(data);

}

// POST /shop/bot/message
exports.botMessage = async (req, res) => {
    const chatId = req.body.chatId;
    const txt = req.body.txt;
    const type = req.body.type;
    mssg(chatId, txt, type);
    res.status(204).send();
}