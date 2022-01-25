import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchExpenses } from "../store/expenses";
import { setFilter } from "../store/filters";

export class AllExpenses extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getExpenses();
  }

  componentWillUnmount() {
    this.props.filter("all");
  }

  render() {
    const expenses = this.props.expenses || [];

    if (!expenses.length) {
      return (
        <div>
          No Expenses
          <div className="footer">
            Filter:
            <select onChange={(event) => this.props.filter(event.target.value)}>
              <option value="all">All Expenses</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>Expense History</h1>
        <div className="footer">
          Filter:
          <select onChange={(event) => this.props.filter(event.target.value)}>
            <option value="all">All Expenses</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div className="wrap">
          {expenses.map((expense) => {
            return (
              <div className="expense" key={expense.id}>
                <h4>Expense Name: {expense.name}</h4>
                <p>Amount: ${expense.amount}</p>
                <p>Expense Type: {expense.type}</p>
                <p>Month: {expense.month}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  const filterFunc = function (state, expenses) {
    if (state.filter.Filter !== "all") {
      return state.expenses.filter(
        (expense) => expense.month === state.filter.Filter
      );
    } else {
      return state.expenses;
    }
  };
  return {
    expenses: filterFunc(state, state.expenses),
    filtered: state.filter,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getExpenses: () => dispatch(fetchExpenses()),
    filter: (filter) => dispatch(setFilter(filter)),
  };
};

export default connect(mapState, mapDispatch)(AllExpenses);
