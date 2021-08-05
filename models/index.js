const fs = require('fs');
const path = require('path');
const { DATABASE } = require('../config');
const { Sequelize,DataTypes } = require('sequelize');

const Op = Sequelize.Op;

const sequelize = new Sequelize('blog','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
    define:{
        timestamps: false, // 默认不加时间戳
        freezeTableName: true // 表名不加s
    }
})

const db = {};

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = require(path.join(__dirname,file))(sequelize,DataTypes);
        db[model.name] = model;
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize;

module.exports = db;