import { UPDATE_CALENDAR } from "../../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  calendar_data: [],
  successMessage: "",
  errorMessage: "",
};

const Calendar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CALENDAR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Calendar;
