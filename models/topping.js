'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topping.hasMany(models.transactionTopping, { 
        as: 'topping',
        foreignKey:{
          name: 'toppingId' 
        }
      })
    }
  };
  topping.init({
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    // qty: DataTypes.STRING,
    // productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'topping',
  });
  return topping;
};