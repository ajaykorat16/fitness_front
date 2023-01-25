import { FORGET_PASS_VALID } from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  check_valid: undefined,
  password_changed: false,
  errorMessage: "",
};

const forget_pass = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGET_PASS_VALID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default forget_pass;
