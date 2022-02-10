const successImport = {
  response: [
    {
      id: 1,
      prod_no: '26682888',
      name: 'Baseus Cable 1 Meter Micro USB',
      sku: 'BS010',
      price: 5000,
      description: '<p>Baseus</p>',
      createdAt: '2022-02-10T01:43:52.652Z',
      updatedAt: '2022-02-10T01:43:52.652Z',
    },
  ],
  status: 200,
  message: 'Berhasil Import Produk',
};

const allProductImported = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'All item is exist in databases',
};

const allImportedIds = {
  response: ['26682888', '28022841', '29325975'],
  status: 200,
};

const notFoundProduct = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'Product Not Found',
};

module.exports = {
  successImport,
  allProductImported,
  allImportedIds,
  notFoundProduct,
};
