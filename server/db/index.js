//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Expense = require("./models/Expense");

//associations could go here!
Expense.belongsTo(User);
User.hasMany(Expense);

module.exports = {
  db,
  models: {
    User,
    Expense,
  },
};
