import { GET_COACH, COACH_WORKOUT_FAVOURITE } from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
};

const CoachData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COACH:
      return { ...state, ...action.payload };
    case COACH_WORKOUT_FAVOURITE:
        return {
          ...state,
          coachs: {...state.coachs,
            data : state.coachs && state.coachs.data && state.coachs.data.map((item) =>
            item.id === action.payload.workout_id
              ? { ...item, is_favorite_count: action.payload.flag }
              : item
          ),}
        };
    default:
      return state;
  }
};

export default CoachData;