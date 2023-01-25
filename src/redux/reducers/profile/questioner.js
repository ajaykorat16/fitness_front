import { UPDATE_WELLNESS_QUESTIONS } from "../../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  wellnessQuestions: [],
  successMessage: "",
  errorMessage: "",
};

const Questioner = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_WELLNESS_QUESTIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Questioner;
