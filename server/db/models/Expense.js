const Sequelize = require("sequelize");
const db = require("../db");

const Expense = db.define("expenses", {
  // define your model here!
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  month: {
    type: Sequelize.ENUM,
    values: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  amount: {
    type: Sequelize.FLOAT(2, 1),
  },
  type: {
    type: Sequelize.ENUM,
    values: [
      "Food",
      "Entertainment",
      "Rent",
      "Medical",
      "Travel",
      "Utilities",
      "Other",
    ],
    defaultValue: "Other",
  },
});

module.exports = Expense;
