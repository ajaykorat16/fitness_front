import { GET_MYPLAN_SIDE_BAR } from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  myPlan: [],
  errorMessage: "",
};

const dashboardData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MYPLAN_SIDE_BAR:
      return { ...state, ...action.payload };
    // case GET_STEPS:
    //   return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default dashboardData;
