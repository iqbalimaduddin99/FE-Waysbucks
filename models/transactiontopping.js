'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactionTopping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transactionTopping.belongsTo(models.transactionProduct, {
				as: 'orderTopping',
				foreignKey: {
          name: 'transactionProductId'
        },
			});
			transactionTopping.belongsTo(models.topping, {
				as: 'topping',
				foreignKey: {
          name: 'toppingId'
        }
			});
    }
  };
  transactionTopping.init({
    transactionProductId: DataTypes.INTEGER,
    toppingId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transactionTopping',
  });
  return transactionTopping;
};