const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  gName: String,
  gImage: String
});

mongoose.model('users', userSchema);
