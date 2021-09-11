'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.transactionProduct, { 
        as: 'productOrder',
        foreignKey:{
          name: 'productId' 
        }
      });
    }
  };
  product.init({
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,  
    // qty: DataTypes.STRING,
    // toppings: DataTypes.STRING,
    // transactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};