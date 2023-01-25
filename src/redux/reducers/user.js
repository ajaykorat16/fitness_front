import {
  UPDATE_AUTH,
  USER_DETAIL,
  UPDATE_USER_PROGRAM_COUNT,
} from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  isAuth: false,
  userDetails: {},
  changeRecipe:[],
};

const User = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return { ...state, ...action.payload };
    case USER_DETAIL:
      return { ...state, ...action.payload };
    case UPDATE_USER_PROGRAM_COUNT:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          user_programs_count:
            state.userDetails.user_programs_count + action.payload,
        },
      };
    default:
      return state;
  }
};

export default User;
