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

  static async showImported(req, h) {
    try {
      const { id } = req.params;
      const products = await ProductService.findProdNo();
      const newProductNo = products.map((el) => el.prod_no);
      return { response: newProductNo, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async store(req, h) {
    try {
      const { selectedProducts: arr } = req.payload || {};
      // Validate Selected IDs
      if (!arr || !Array.isArray(arr)) throw createHttpError(400, 'Invalid Selected Products');
      const idSelecteds = arr.filter((item, i) => arr.indexOf(item) === i); // Get unique prod_no
      const products = []; // Initiate products
      const contents = []; // Initiate Contents
      // Get already imported prod_no
      const alreadyIserted = await ProductService.selectIN(idSelecteds);
      const uniquProduct = []; // Initiate variable not imported prod_no
      idSelecteds.forEach((el) => {
        if (alreadyIserted.indexOf(el) < 0) uniquProduct.push(el); // Push unique prod_no
      });
      // Fetch all detail product from elevania where unique prod_no
      const newProducts = await Promise.all(uniquProduct.map((el) => Elevania.findOne(el)));
      const dateCreated = new Date(); // set createdAt
      // iterate product from elevania, and parse to new format
      newProducts.forEach((prd) => {
        if (prd) {
          const { htmlDetail, prdNm, prdNo, sellerPrdCd, selPrc } = prd;
          // prod_no, name, sku, price, description;
          const defSKU = `SKU-${prdNo}`.toUpperCase(); // set default SKU
          const sku = typeof sellerPrdCd === 'object' ? defSKU : sellerPrdCd.toUpperCase();
          const price = Number.isNaN(+selPrc) ? 0 : +selPrc; // Handle Product Price
          // initiate payload product
          const payloadProduct = {
            sku,
            price,
            name: prdNm,
            prod_no: prdNo,
            description: htmlDetail,
            createdAt: dateCreated,
            updatedAt: dateCreated,
          };
          products.push(payloadProduct); // Push new Product Format to products
          // iterate available image keys
          imgKeys.forEach((el) => {
            const payloadContents = {
              createdAt: dateCreated,
              updatedAt: dateCreated,
              prod_no: prdNo,
              image_type: el,
              image_url: prd[el],
            };
            // prod_no, image_type, image_url;
            if (prd[el]) contents.push(payloadContents); // Push new image to contents
          });
        }
      });

      const response = {};
      if (products.length > 0) response[0] = await ProductService.addProduct(products); // Create Many Product
      if (contents.length > 0) response[1] = await ContentService.addContent(contents); // Create Many Contents
      if (products.length < 1) throw createHttpError(400, 'All item is exist in databases');
      return { response, status: 200, message: 'Berhasil Import Produk' };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

module.exports = SyncProduct;
