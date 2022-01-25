import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
//import * as V from "victory";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryPie,
  VictoryLabel,
} from "victory";
import { fetchExpenses } from "../store/expenses";
import { setFilter } from "../store/filters";
import AddExpense from "./AddExpense";

/**
 * COMPONENT
 */
export class Home extends React.Component {
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
    const { username, expenses, budget, filtered } = this.props;
    const reducedExpenses = expenses.reduce((a, expense) => {
      const exists = a.find((expenseType) => expenseType.type === expense.type);
      if (exists) {
        exists.amount += expense.amount;
        return a;
      }
      a.push({ type: expense.type, amount: expense.amount });
      return a;
    }, []);
    const remainingBudget = Math.round(
      budget -
        reducedExpenses.reduce((a, category) => {
          return a + category.amount;
        }, 0)
    );
    const expensePlots = reducedExpenses.map((category) => {
      return { x: category.type, y: (100 * category.amount) / budget };
    });
    const data =
      remainingBudget > 0 && filtered.Filter !== "all"
        ? expensePlots.concat([
            {
              x: "Remaining",
              y: (100 * remainingBudget) / budget,
            },
          ])
        : expensePlots;

    return (
      <div>
        <h3>Welcome, {username}</h3>
        <div className="row">
          <div className="pie">
            <svg viewBox="0 0 340 340">
              <VictoryPie
                colorScale={[
                  "orange",
                  "cyan",
                  "teal",
                  "gold",
                  "LightBlue",
                  "Coral",
                  "LightCyan",
                  "tomato",
                  "PowderBlue",
                ]}
                standalone={false}
                width={340}
                height={340}
                data={data}
                innerRadius={30}
                labelRadius={90}
                labelPlacement={"parallel"}
                labels={({ datum }) =>
                  `${datum.x} : $${Math.round(datum.y * budget) / 100}`
                }
                style={{ labels: { fontSize: 8, fill: "navy" } }}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 20 }}
                x={170}
                y={170}
                text={filtered.Filter}
              />
            </svg>
          </div>
          <AddExpense />
        </div>
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
    username: state.auth.username,
    expenses: filterFunc(state, state.expenses),
    userId: state.auth.id,
    budget: state.auth.budget,
    filtered: state.filter,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getExpenses: () => dispatch(fetchExpenses()),
    filter: (filter) => dispatch(setFilter(filter)),
  };
};

export default connect(mapState, mapDispatch)(Home);
