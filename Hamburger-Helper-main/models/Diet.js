const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Diet extends Model {}

Diet.init(
    {
        id: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        limit: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "diet"
    }
);

module.exports = Diet;