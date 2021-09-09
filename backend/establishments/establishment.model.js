const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false},
        middleName: { type: DataTypes.STRING, allowNull: false},
        lastName: { type: DataTypes.STRING, allowNull: false},
        username: { type: DataTypes.STRING, allowNull: false},
        email: { type: DataTypes.STRING, allowNull: false},
        establishment_name: {type: DataTypes.STRING, allowNull: false},
        mobile_number: { type: DataTypes.STRING, allowNull: false},
        temperature: { type: DataTypes.STRING, allowNull: false},
        hash: { type: DataTypes.STRING, allowNull: false}
        
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Establishment', attributes, options);
}