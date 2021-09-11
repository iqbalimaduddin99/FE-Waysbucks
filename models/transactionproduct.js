'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactionProduct.belongsTo(models.transaction, { 
				as: 'orderProduct',
        foreignKey: {
          name: 'transactionId'
        }
			});
			transactionProduct.belongsTo(models.product, {
				as: 'productOrder',
				foreignKey: {
          name: 'productId'},
			});
			transactionProduct.hasMany(models.transactionTopping, {
				as: 'orderTopping',
        foreignKey: {
          name: 'transactionProductId'
        },
			});
    }
  };
  transactionProduct.init({
    transactionId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactionProduct',
  });
  return transactionProduct;
};