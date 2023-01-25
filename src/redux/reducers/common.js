import { ADDRESS_MANAGE } from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  countries: [],
  height: [],
  activityLevel: [],
  fitnessGoal: [],
  errorMessage: "",
};

const common = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDRESS_MANAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default common;
