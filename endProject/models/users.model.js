const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  },
  favoriteSongs: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
});

// create collection
const Users = mongoose.model("Users", userSchema);

// create new user
const insertUser = (firstName, lastName, email, password) => {
  const user = new Users({
    firstName,
    lastName,
    email,
    password,
  });
  return user.save();
};

const updateFavorites = (song, email, removeOrAdd) => {
  if (removeOrAdd === "add") {
    return Users.updateOne({ email }, { $push: { favoriteSongs: song } });
  } else if (removeOrAdd === "remove") {
    return Users.updateOne({ email }, { $pull: { favoriteSongs: song } });
  }
};

const updateEmail = (email, key, date) => {
  return Users.updateOne(
    { email },
    { "emailVerification.websiteKey": key, "emailVerification.emailDate": date }
  );
};

const updateRecovery = (email, key, date) => {
  return Users.updateOne(
    { email },
    { "recovery.secretKey": key, "recovery.dateRecovery": date }
  );
};

const updatePassword = (email, password) => {
  return Users.updateOne({ email }, { password, "recovery.secretKey": "" });
};

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const selectFavsByEmail = (email) => {
  console.log(email, "email");
  return Users.find({ email });
};

module.exports = {
  insertUser,
  selectUserByEmail,
  updateRecovery,
  updatePassword,
  updateEmail,
  updateFavorites,
  selectFavsByEmail,
};
