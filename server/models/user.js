const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define User Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Encrypt password after saving into DB
// Before saving, run this
userSchema.pre('save', function(next) {
  // get an access to user model
  const user = this;

  // generate a salt and after run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite password with encrypted password
      user.password = hash;
      next();
    })
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  })
}

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;