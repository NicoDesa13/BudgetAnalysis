const SET_FILTER = "SET_FILTER";

const ALL = "ALL";
const JANUARY = "JANUARY";
const FEBRUARY = "FEBRUARY";
const MARCH = "MARCH";
const APRIL = "APRIL";
const MAY = "MAY";
const JUNE = "JUNE";
const JULY = "JULY";
const AUGUST = "AUGUST";
const SEPTEMBER = "SEPTEMBER";
const OCTOBER = "OCTOBER";
const NOVEMBER = "NOVEMBER";
const DECEMBER = "DECEMBER";

export const setFilter = (Filter) => ({
  type: SET_FILTER,
  Filter,
});

const initialState = {
  Filter: "all",
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, Filter: action.Filter };
    default:
      return state;
  }
}
