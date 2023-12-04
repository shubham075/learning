const { Op } = require('sequelize');
const models = require('../../db/models');


exports.getCategoryID = async (ele) => {
    return models.categories.findOne({
        where: {
            name: ele
        }
    });
}

exports.getProduct_dataByID = async (id) => {
    return models.product_data.findOne({
        where: {
            id: id
        }
    });
}
exports.searchForProductName = async (ele) => {
    return models.products.findOne({
        where: { name: ele.name }
        // default:{
        //     description:ele.description,
        //     image:ele.image,
        //     categoryID:'',
        // }
    });
}

exports.getAllProductsBy_categoryID = async (id) => {
    return models.products.findAll({
        include: [
            { model: models.product_data, as: 'productData' }
        ],
        where: {
            categoryID: id
        }
    })
}
exports.getProductWithDataBy_productID = (id) => {
    return models.products.findAll({
        include: [
            { model: models.product_data, as: 'productData' }
        ],
        where: {
            id: id
        }
    })
}

exports.insertIntoProduct = async (ele1, ele2) => {
    return models.products.create({
        name: ele1.name,
        description: ele1.description,
        image: ele1.image,
        categoryID: ele2
    });
}

exports.searchForProduct_sizeByProductID = async (ele1, ele2) => {
    return models.product_data.findAll({
        where: { [Op.and]: [{ size: ele1 }, { productID: ele2 }] }
    });
}

exports.insertIntoProduct_data = async (ele1, ele2) => {
    return models.product_data.create({
        size: ele1.size,
        price: ele1.price,
        stock: ele1.stock,
        productID: ele2
    })
}

exports.getAllCategories = async () => {
    return models.categories.findAll();
}

exports.getUserByEmail = async (email) => {
    return models.customers.findOne({
        where: {
            email: email
        }
    })
}

exports.createNewUser = async (data) => {
    return models.customers.create({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        phone: data.phone
    })
}

exports.create_cart_data = async (data, ele) => {
    return models.cart_data.create({
        quantity: data.quantity,
        productID: data.productID,
        product_dataID: data.data_ID,
        customerID: ele
    });
}