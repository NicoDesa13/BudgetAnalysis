import axios from "axios";

const SET_EXPENSES = "SET_EXPENSES";
const ADD_EXPENSE = "ADD_EXPENSE";

export const setExpenses = (expenses) => ({
  type: SET_EXPENSES,
  expenses,
});

export const _addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const fetchExpenses = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/expenses");
      dispatch(setExpenses(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addExpense = (expense) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/expenses", expense);
      dispatch(_addExpense(created));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPENSES:
      return action.expenses;
    case ADD_EXPENSE:
      return [...state, action.expense];
    default:
      return state;
  }
}
