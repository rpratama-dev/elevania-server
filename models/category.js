/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      depth: DataTypes.INTEGER,
      disp_name: DataTypes.STRING,
      disp_no: DataTypes.INTEGER,
      parent_disp_no: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
