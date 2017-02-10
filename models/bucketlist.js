
// var Sequelize = require("sequelize");

var sequelize = require("../config/config.json");

module.exports = function(sequelize, DataTypes) {
  var BucketItem = sequelize.define('BucketItem', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
      title: { 
        type: Sequelize.STRING
      },
      isAchieved: DataTypes.BOOLEAN
      
  },

  {
    // We're saying that we want our BucketItem to have Posts
    classMethods: {
      associate: function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        BucketItem.belongsTo(models.User, {
          foreignKey: {
              allowNull: false
            }
        });
      }
    }
  }//classMethods
);

// sequelize.sync({force: true});
  return BucketItem;

}

// module.exports = BucketItem
