module.exports = {
  invalidInput: {
    statusCode: 400,
    error: 'Bad Request',
    message: 'Invalid request payload input',
  },
  addProduct: {
    response: {
      id: 4,
      prod_no: '1644464462350',
      name: 'Test By Me with balnk description',
      sku: 'SKU-ME-NODESC',
      price: 12345,
      description: null,
      createdAt: '2022-02-10T03:41:02.350Z',
      updatedAt: '2022-02-10T03:41:02.350Z',
    },
    status: 201,
    message: 'Berhasil menambahkan produk',
  },
  updateProduct: {
    response: {
      name: 'Test By Me Edit',
      sku: 'SKU-ME-EDIT',
      price: 123453,
      description: '<p>Test Product Description Edit</p>',
      updatedAt: '2022-02-10T04:40:14.534Z',
      prod_no: '1644467812353',
    },
    message: 'Berhasil update product',
    status: 200,
  },
  notFoundProduct: {
    statusCode: 400,
    error: 'Bad Request',
    message: 'Product Not Found',
  },
  duplicateSKU: {
    statusCode: 400,
    error: 'Bad Request',
    message: 'duplicate key value violates unique constraint "Products_sku_key"',
  },
};
