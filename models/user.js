var bcrypt   = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
    // generating a hash
    User.generateHash = function(password) {
        // or use crypto
//        var crypto = require('crypto');
//        var shasum = crypto.createHash('sha1');
//        shasum.update(this.password);
//        this.password = shasum.digest('hex');
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    // checking if password is valid
    User.validPassword = function(user, password) {
        return bcrypt.compareSync(password, user.password);
    };

    return User;
}
