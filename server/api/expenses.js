const router = require("express").Router();
const {
  models: { Expense },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Expense.create(req.body));
  } catch (error) {
    next(error);
  }
});
