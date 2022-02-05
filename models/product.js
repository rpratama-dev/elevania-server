/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      prod_no: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: { type: DataTypes.INTEGER },
      description: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
