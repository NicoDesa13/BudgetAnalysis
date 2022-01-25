import React from "react";
import { addExpense } from "../store/expenses";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      month: "January",
      amount: "",
      type: "Other",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addExpense({ ...this.state });
    this.setState({ name: "", month: "", amount: "", type: "" });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { name, month, amount, type } = this.state;
    const { handleSubmit } = this;
    const disableValue =
      !this.state.name ||
      !this.state.month ||
      !this.state.amount ||
      !this.state.type
        ? true
        : false;

    return (
      <form className="expense" onSubmit={handleSubmit}>
        <strong className="left">Add New Expense:</strong>
        <label htmlFor="name">
          Expense Name:
          <span className="warning">
            {this.state.name ? "" : "Field is required!"}
          </span>
        </label>
        <input name="name" value={name} onChange={this.handleChange} />

        <label htmlFor="amount">
          Amount:
          <span className="warning">
            {this.state.amount ? "" : "Field is required!"}
          </span>
        </label>
        <input name="amount" value={amount} onChange={this.handleChange} />

        <label>
          Expense Month:
          <select name="month" value={month} onChange={this.handleChange}>
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
        </label>

        <label>
          Expense Type:
          <select name="type" value={type} onChange={this.handleChange}>
            <option value="Other">Other</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Rent">Rent</option>
            <option value="Medical">Medical</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
          </select>
        </label>

        <button type="submit" disabled={disableValue}>
          Submit
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(null, mapDispatchToProps)(AddExpense);
