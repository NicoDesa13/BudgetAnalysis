"use strict";

const {
  db,
  models: { User, Expense },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      budget: 5000,
      username: "cody",
      password: "123",
      email: "cody@hotmail.com",
    }),
    User.create({
      budget: 2500,
      username: "nicole",
      password: "123",
      email: "nd13@gmail.com",
    }),
  ]);

  // Creating Expenses
  const expenses = await Promise.all([
    Expense.create({
      name: "ConEd",
      month: "December",
      amount: 100,
      type: "Utilities",
      userId: 1,
    }),
    Expense.create({
      name: "Rent",
      month: "December",
      amount: 500,
      type: "Rent",
      userId: 1,
    }),
    Expense.create({
      name: "Dinner Date",
      month: "December",
      amount: 150,
      type: "Food",
      userId: 1,
    }),
    Expense.create({
      name: "Miami Trip",
      month: "January",
      amount: 200,
      type: "Travel",
      userId: 1,
    }),
    Expense.create({
      name: "Verizon Fios",
      month: "January",
      amount: 40,
      type: "Utilities",
      userId: 1,
    }),
    Expense.create({
      name: "Rent",
      month: "January",
      amount: 300,
      type: "Rent",
      userId: 1,
    }),
    Expense.create({
      name: "Trader Joes",
      month: "January",
      amount: 70,
      type: "Food",
      userId: 1,
    }),
    Expense.create({
      name: "Train Ticket",
      month: "January",
      amount: 17,
      type: "Travel",
      userId: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${expenses.length} expenses`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      nicole: users[1],
    },
    expenses: {
      expense1: expenses[0],
      expense2: expenses[1],
      expense3: expenses[2],
      expense4: expenses[3],
      expense5: expenses[4],
      expense6: expenses[5],
      expense7: expenses[6],
      expense8: expenses[7],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
