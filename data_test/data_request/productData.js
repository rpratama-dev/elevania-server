const validProducNo = '26682888';
const validSKU = 'BS010';
const invalidProducNo = '26682888xx';
const invalidSKU = 'BS010xx';
const validProduct = {
  name: 'Test By Me',
  sku: 'SKU-ME',
  price: 12345,
  description: 'Test Product Description',
};

// Update / insert Blank
const blankProduct = {
  name: '',
  sku: '',
  price: '',
  description: '',
};

const blankDescProduct = {
  name: 'Test By Me with balnk description',
  sku: 'SKU-ME-NODESC',
  price: '12345',
  description: '',
};

const validUpdateProduct = {
  name: 'Test By Me Edit',
  sku: 'SKU-ME-EDIT',
  price: 123453,
  description: '<p>Test Product Description Edit</p>',
};

const updateSKUDuplicate = {
  name: 'Test By Me Update SKU Duplicate',
  sku: 'TORU01',
  price: 123453,
  description: '<p>Test Product Description Duplicate</p>',
};

module.exports = {
  validProducNo,
  validSKU,
  invalidProducNo,
  invalidSKU,
  validProduct,
  blankProduct,
  blankDescProduct,
  validUpdateProduct,
  updateSKUDuplicate,
};
