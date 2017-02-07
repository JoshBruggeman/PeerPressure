'use strict';
//base model loads all the other models
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var  basename  = path.basename(module.filename)
var env       = process.env.NODE_ENV || 'development';

var db        = {};
var config    = require(__dirname + '/../config/config.json')[env];
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname) //looking at the current directory or the specified "_dirname"
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file)); //directory name\file
    db[model.name] = model;
  });
//parsing an array
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
