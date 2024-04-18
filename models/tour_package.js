"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour_Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Dari Tour_Package ke Booking 'customerId'
      Tour_Package.hasMany(models.Booking, {
        foreignKey: {
          name: "packageId",
        },
      });

      // belongTo dari id Tour_Package
      Tour_Package.belongsTo(models.Store, {
        foreignKey: {
          name: "storeId",
        },
      });
    }
  }
  Tour_Package.init(
    {
      packageName: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      destination: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tour_Package",
    }
  );
  return Tour_Package;
};
