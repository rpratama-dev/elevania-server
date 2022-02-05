/* eslint-disable no-unused-vars */
const createHttpError = require('http-errors');
const errorHandler = require('../helper/ErrorHandler');
const parseXml = require('../helper/ParseXML');
const ProductService = require('../services/ProductService');
const elevaniaHost = require('../utils/elevaniaHost');

class ProductController {
  static async index(req, h) {
    try {
      const products = await ProductService.find();
      return { response: products, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async show(req, h) {
    try {
      const { id } = req.params;
      const [products] = await ProductService.findOne(id);
      if (!products) throw createHttpError(404, 'Product Not Found');
      return { response: products, status: 200 };
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
