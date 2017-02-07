var bcrypt   = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    },
    {
    // We're saying that we want our Author to have Posts
    classMethods: {
      associate: function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        User.hasMany(models.BucketItem, {
          onDelete: "cascade"
        });
      }
    }
  }
  );
    // generating a hash
    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    // checking if password is valid
    User.validPassword = function(user, password) {
        return bcrypt.compareSync(password, user.password);
    };




    return User;
}
