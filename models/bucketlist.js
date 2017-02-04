module.exports = function(sequelize, DataTypes) {
  var Bucketlist = sequelize.define("bucketlistItem", {
    eventAcheived: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    {
      // We're saying that we want our User to have bucketlist items
      classMethods: {
        associate: function(models) {
          // An User (foreignKey) is required or a Post can't be made
          bucketlist.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
