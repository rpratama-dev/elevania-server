/* eslint-disable no-unused-vars */
const createHttpError = require('http-errors');
const errorHandler = require('../helper/ErrorHandler');
const parseXml = require('../helper/ParseXML');
const ProductService = require('../services/ProductService');
const elevaniaHost = require('../utils/elevaniaHost');

class ProductController {
  static async index(req, h) {
    try {
      const products = await ProductService.findJoinContent();
      const temps = {};
      products.forEach((product) => {
        // const product = products[el];
        const { image_type, image_url } = product;
        const image = { image_type, image_url };
        if (!temps[product.prod_no]) temps[product.prod_no] = { ...product, images: [image] };
        else temps[product.prod_no].images.push(image);
      });
      const response = Object.keys(temps).map((el) => temps[el]);
      return { response, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async show(req, h) {
    try {
      const { id } = req.params;
      const [products] = await ProductService.findOneJoinContent(id);
      const temps = {};
      products.forEach((el) => {
        const { image_type, image_url } = el;
        const image = { image_type, image_url };
        if (!temps[el.prod_no]) temps[el.prod_no] = { ...el, images: [image] };
        else temps[el.prod_no].images.push(image);
      });
      const [response] = Object.keys(temps).map((el) => temps[el]);
      if (products.length < 1) throw createHttpError(404, 'Product Not Found');
      return { response, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async store(req, h) {
    try {
      const dateCreated = new Date().toISOString();
      const { name, sku, price, description } = req.payload;
      const prod_no = Date.now();
      const payload = [prod_no, name, sku, +price, description, dateCreated, dateCreated];
      await ProductService.addProduct([payload]);
      const params = { prod_no, name, sku, price, description };
      return { response: params, payload, status: 201 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async update(req, h) {
    try {
      const { id } = req.params;
      const [products] = await ProductService.findOne(id);
      if (!products) throw createHttpError(404, 'Product Not Found');
      const { name, sku, price, description } = req.payload;
      const payload = { name, sku, price: +price, description };
      const response = await ProductService.updateOne(payload, id);
      return { response, payload, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async delete(req, h) {
    try {
      const { id } = req.params;
      const [products] = await ProductService.findOne(id);
      if (!products) throw createHttpError(404, 'Product Not Found');
      await ProductService.deleteOne(id);
      return { response: products, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

module.exports = ProductController;
