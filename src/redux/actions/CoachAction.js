import { GET_COACH, COACH_WORKOUT_FAVOURITE } from "../../config/actionTypes";
import RAW from "../../api/raw";

export const getCoach = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_COACH,
        payload: {
          loading: true,
        },
      });
      
      const response = await RAW.get("/workout_created_by_coaches");
      if (response.data.success) {
        dispatch({
          type: GET_COACH,
          payload: {
            loading: false,
            coachs: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        dispatch({
          type: GET_COACH,
          payload: {
            loading: false,
            coachs: {},
            errorMessage: response.data.message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type:GET_COACH,
        payload: {
          coachs: {},
          errorMessage: "Error: " + err,
        },
      });
    }
  };


  export const getLiveStream = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_COACH,
        payload: {
          loading: true,
        },
      });
      
      const response = await RAW.get("/live_workout_created_by_coaches");
      if (response.data.success) {
        dispatch({
          type: GET_COACH,
          payload: {
            loading: false,
            liveSteam: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        dispatch({
          type: GET_COACH,
          payload: {
            loading: false,
            liveSteam: {},
            errorMessage: response.data.message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type:GET_COACH,
        payload: {
          dashboard: [],
          errorMessage: "Error: " + err,
        },
      });
    }
  };


  export const CoachNextPage = (data) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_COACH,
        payload: {
          loading: true,
        },
      });
      
      const response = await RAW.get(`/workout_created_by_coaches?page=${data}`);
      if (response.data.success) {
        dispatch({
          type: GET_COACH,
          payload: {
            loading: false,
            coachs: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        dispatch({
          type: GET_COACH,
          payload: {
            loading: false,
            coachs: [],
            errorMessage: response.data.message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type:GET_COACH,
        payload: {
          coachs: [],
          errorMessage: "Error: " + err,
        },
      });
    }
  };


  export const coachFavouriteWorkout =
  (workout_id,fav) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COACH_WORKOUT_FAVOURITE,
        payload: {
          workout_id: workout_id,
          flag: fav==0?1:0,
        },
      });
      const response = await RAW.post(`/add_favorite_workout`, {
        id: workout_id,
      });
      if (response.data.success) {
        dispatch({
          type: COACH_WORKOUT_FAVOURITE,
          payload: {
            workout_id: workout_id,
            flag: response.data.data,
          },
        });
      } else
        dispatch({
          type: COACH_WORKOUT_FAVOURITE,
          payload: {
            errorMessage: response.data.message,
          },
        });
    } catch (err) {
      dispatch({
        type: COACH_WORKOUT_FAVOURITE,
        payload: {
          loading: false,
          errorMessage: "Error" + err,
        },
      });
    }
  };
