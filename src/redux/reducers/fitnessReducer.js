import {
  MANAGE_FITNESS,
  MARK_WORKOUT_FAVOURITE,
  MARK_WORKOUT_DETAILS_FAVOURITE,
  TODAY_WORKOUT_FAVOURITE,
  LIVE_WORKOUT_FAVOURITE
} from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  workoutVideos: [],
  workoutPaginationObj: {},
  workoutCategories: [],
  equipment: [],
  fitnessDetails: {},
  selectedOverview: {},
  fitnessLevels: [],
  liveSession:[],
  livePaginationObj:{},
  successMessage: "",
  errorMessage: "",
};

const Fitness = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MANAGE_FITNESS:
      return { ...state, ...action.payload };
    case MARK_WORKOUT_FAVOURITE:
      return {
        ...state,
        workoutVideos: state.workoutVideos.map((item) =>
          item.id === action.payload.workout_id
            ? { ...item, is_favorite_count: action.payload.flag }
            : item
        ),
      };
      case LIVE_WORKOUT_FAVOURITE:
        return {
          ...state,
          liveSession: state.liveSession.map((item) =>
            item.id === action.payload.workout_id
              ? { ...item, is_favorite_count: action.payload.flag }
              : item
          ),
        };
    case MARK_WORKOUT_DETAILS_FAVOURITE:
      return {
        ...state,
        fitnessDetails: {
          ...state.fitnessDetails,
          recommended_workout: state.fitnessDetails.recommended_workout.map(
            (item) =>
              item.id === action.payload.workout_id
                ? { ...item, is_favorite_count: action.payload.flag }
                : item
          ),
        },
      };
    case TODAY_WORKOUT_FAVOURITE:
      return {
        ...state,
        fitnessDetails: {
          ...state.fitnessDetails,
          today_workout: state.fitnessDetails.today_workout.map(
            (item) =>
              item.programmable_user.id == action.payload.workout_id
                ? { ...item, programmable_user :{ ...item.programmable_user ,is_favorite_count : action.payload.flag } }
                : item
          ),
        },
      };
    default:
      return state;
  }
};

export default Fitness;
