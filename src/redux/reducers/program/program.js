import { UPDATE_PROGRAM } from "../../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  plansLoading: false,
  signupFlag: false,
  all_programs: [],
  suggested_programs: [],
  subscription_plans: [],
  programDetails: {},
  successMessage: null,
  clashCheckFlag: false,
  clashedProgramsCount: 0,
  errorMessage: "",
};

const Program = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROGRAM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Program;
