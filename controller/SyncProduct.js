/* eslint-disable no-unused-vars */
const createHttpError = require('http-errors');
const errorHandler = require('../helper/ErrorHandler');
const parseXml = require('../helper/ParseXML');
const { sequelize } = require('../models');
const ContentService = require('../services/ContentService');
const Elevania = require('../services/ElevaniaService');
const ProductService = require('../services/ProductService');
const elevaniaHost = require('../utils/elevaniaHost');

const imgKeys = ['prdImage01', 'prdImage02', 'prdImage03', 'prdImage04', 'prdImage05'];

class SyncProduct {
  static async index(req, h) {
    try {
      const { pageNumber = 1 } = req.query;
      const products = await Elevania.find(pageNumber);
      const newProduct = products.map((el) => ({
        name: el.prdNm,
        no: el.prdNo,
        sku: typeof el.sellerPrdCd !== 'string' ? `SKU-${el.prdNo}` : el.sellerPrdCd,
        price: el.selPrc,
      }));
      return { response: newProduct, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async show(req, h) {
    try {
      const { id } = req.params;
      const product = await Elevania.findOne(id);
      if (!product) throw createHttpError(404, 'Produk Tidak Ditemukan');
      return { response: product, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async store(req, h) {
    try {
      const { selectedProducts } = req.payload || {};
      if (!selectedProducts || !Array.isArray(selectedProducts))
        throw createHttpError(400, 'Invalid Selected Products');
      const products = [];
      const contents = [];
      const alreadyIserted = await ProductService.selectIN(selectedProducts);
      const uniquProduct = [];
      selectedProducts.forEach((el) => {
        if (alreadyIserted.indexOf(el) < 0) uniquProduct.push(el);
      });
      const newProducts = await Promise.all(uniquProduct.map((el) => Elevania.findOne(el)));
      const dateCreated = new Date().toISOString();
      newProducts.forEach((prd) => {
        if (prd) {
          const { htmlDetail, prdImage01, prdImage02, prdImage03, prdImage04, prdImage05 } = prd;
          const { prdNm, prdNo, sellerPrdCd, selPrc } = prd;
          // prod_no, name, sku, price, description;
          const sku = typeof sellerPrdCd === 'object' ? `SKU-${prdNo}` : sellerPrdCd;
          const newProduct = [prdNo, prdNm, sku, +selPrc, htmlDetail, dateCreated, dateCreated];
          products.push(newProduct);
          imgKeys.forEach((el) => {
            if (prd[el]) contents.push([prdNo, el, prd[el], dateCreated, dateCreated]); // prod_no, image_type, image_url;
          });
        }
      });

      if (products.length > 0) await ProductService.addProduct(products); // [[], 20 ]
      if (contents.length > 0) await ContentService.addContent(contents); // [[], 31 ]
      if (products.length < 1) throw createHttpError(400, 'All item is exist in databases');
      return { response: products, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

module.exports = SyncProduct;
