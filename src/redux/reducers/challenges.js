import { ALL_CHALLENGES, CHALLENGES_DETAILS, DASHBOARD_CHALLENGE } from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
};

const challenges = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALL_CHALLENGES:
      return { ...state, ...action.payload };
    case CHALLENGES_DETAILS:
      return { ...state, ...action.payload };
    case DASHBOARD_CHALLENGE:
        return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default challenges;
