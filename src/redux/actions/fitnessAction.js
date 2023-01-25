import {
  MANAGE_FITNESS,
  MARK_WORKOUT_FAVOURITE,
  MARK_WORKOUT_DETAILS_FAVOURITE,
  LIVE_WORKOUT_FAVOURITE,
  TODAY_WORKOUT_FAVOURITE,
} from "../../config/actionTypes";
import { UPDATE_CALENDAR } from "../../config/actionTypes";
import RAW from "../../api/raw";
import { message } from "antd";

export const getWorkoutVideos = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/search_workout", { params: data });
    if (response.data.success) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          workoutVideos: response.data.data.data,
          workoutPaginationObj: response.data.data,
          successMessage: response.data.message,
          loading: false,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          workoutVideos: [],
          workoutPaginationObj: {},
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        workoutVideos: [],
        errorMessage: "Error" + err,
      },
    });
  }
};


export const getLiveWorkout = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/live_workout", { params: data });
    if (response.data.success) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          liveSession: response.data.data.data,
          livePaginationObj: response.data.data,
          successMessage: response.data.message,
          loading: false,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          liveSession: [],
          liveSession: {},
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        // workoutVideos: [],
        errorMessage: "Error" + err,
      },
    });
  }
};

export const searchWorkoutVideos = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get(`/search_workout?query_val=${data}`);

    if (response.data.success) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          workoutVideos: response.data.data.data,
          workoutPaginationObj: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          workoutVideos: [],
          workoutPaginationObj: {},
          successMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const addNewSchedule = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CALENDAR,
      payload: {
        loading: true,
      },
    });

    const response = await RAW.post("/add_new_schedule", data);

    if (response.data.success) {
      message.success(response.data.message);
      dispatch({
        type: UPDATE_CALENDAR,
        payload: {
          loading: false,
          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      dispatch({
        type: UPDATE_CALENDAR,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_CALENDAR,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getWorkoutFilters = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/get_filter?type=" + data.type);
    if (response.data.success) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          workoutCategories: response.data.data.categories,
          fitnessLevels: response.data.data.fitness_level,
          equipment:response.data.data.equipment,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          workoutCategories: [],
          fitnessLevels: [],
          equipment:[],
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        workoutCategories: [],
        fitnessLevels: [],
        equipment:[],
        errorMessage: "Error" + err,
      },
    });
  }
};

export const getWorkoutDetails = (workout_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get(`/get_workout/${workout_id}`);
    if (response.data.success) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          fitnessDetails: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          fitnessDetails: {},
          successMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const addToFavouriteWorkout =
  (workout_id,fav) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MARK_WORKOUT_FAVOURITE,
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
          type: MARK_WORKOUT_FAVOURITE,
          payload: {
            workout_id: workout_id,
            flag: response.data.data,
          },
        });
      } else
        dispatch({
          type: MANAGE_FITNESS,
          payload: {
            errorMessage: response.data.message,
          },
        });
    } catch (err) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          errorMessage: "Error" + err,
        },
      });
    }
  };


  export const addToLiveFavourite =
  (workout_id,fav) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LIVE_WORKOUT_FAVOURITE,
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
          type: LIVE_WORKOUT_FAVOURITE,
          payload: {
            workout_id: workout_id,
            flag: response.data.data,
          },
        });
      } else
        dispatch({
          type: MANAGE_FITNESS,
          payload: {
            errorMessage: response.data.message,
          },
        });
    } catch (err) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          errorMessage: "Error" + err,
        },
      });
    }
  };

  export const addFavouriteWorkoutDetails =
  (workout_id,fav) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MARK_WORKOUT_DETAILS_FAVOURITE,
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
          type: MARK_WORKOUT_DETAILS_FAVOURITE,
          payload: {
            workout_id: workout_id,
            flag: response.data.data,
          },
        });
      } else
        dispatch({
          type: MARK_WORKOUT_DETAILS_FAVOURITE,
          payload: {
            errorMessage: response.data.message,
          },
        });
    } catch (err) {
      dispatch({
        type: MARK_WORKOUT_DETAILS_FAVOURITE,
        payload: {
          loading: false,
          errorMessage: "Error" + err,
        },
      });
    }
  };

export const getWorkoutOverviewModalData = (workout_id,eventId,moment) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get(`/get_workout_model/${workout_id}/${eventId}`);
    if (response.data.success) {
      if(response.data.data.workout_progress){
        response.data.data.workout_progress["calories"] =response.data.data.workout_progress.calories_planned
        response.data.data.workout_progress["duration"] =response.data.data.workout_progress.duration_planned
        response.data.data.workout_progress["duration_complete"] = moment
        .utc(response.data.data.workout_progress.duration_complete * 1000)
        .format("HH:mm:ss");
        response.data.data.workout_progress["distance"] =response.data.data.workout_progress.distance_planned
      }
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          selectedOverview: response.data.data.workout_progress,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const updateWorkoutProgress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post(`/update_workout_progress`, data);
    if (response.data.success) {
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          selectedOverview: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_FITNESS,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_FITNESS,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};


export const DeleteWorkout = ({workout_id, program_id}) => async (dispatch) => {
  try {
    const response = await RAW.post(`workout_delete/${workout_id}/${program_id}`);
    message.success("Workout is Deleted")
  } catch (err) {
    message.error("Workout deleted is failed")
    console.log("delete workout error-------------",err)
  }
}

export const WorkoutComplete = (workout_id) => async (dispatch) => {
  try {
    const response = await RAW.post(`workout_complete/${workout_id}`);
  } catch (err) {
    console.log("delete workout error-------------",err)
  }
}


export const TodayFavouriteWorkout =
  (workout_id,fav) => async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: TODAY_WORKOUT_FAVOURITE,
      //   payload: {
      //     workout_id: workout_id,
      //     flag: fav==0?1:0,
      //   },
      // });
      const response = await RAW.post(`/add_favorite_workout`, {
        id: workout_id,
      });

      console.log("favras------------------",response.data)
      if (response.data.success) {
        dispatch({
          type: TODAY_WORKOUT_FAVOURITE,
          payload: {
            workout_id: workout_id,
            flag: response.data.data,
          },
        });
      } else
        dispatch({
          type: TODAY_WORKOUT_FAVOURITE,
          payload: {
            errorMessage: response.data.message,
          },
        });
    } catch (err) {
      dispatch({
        type: TODAY_WORKOUT_FAVOURITE,
        payload: {
          loading: false,
          errorMessage: "Error" + err,
        },
      });
    }
  };

