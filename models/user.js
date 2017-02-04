module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    username: DataTypes.STRING,
    id: {
              type: Datatypes.INTEGER,
              timestamps: true,
              autoIncrement: true,
              primaryKey: true
          }
  }
  },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          User.hasMany(models.Bucketlist, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Author;
};
