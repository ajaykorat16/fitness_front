import { UPDATE_NUTRITION_CALCULATOR } from "../../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  nutritionData: {},
  successMessage: "",
  errorMessage: "",
};

const Nutrition = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_NUTRITION_CALCULATOR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Nutrition;
