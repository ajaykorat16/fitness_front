import { UPDATE_CALENDAR } from "../../config/actionTypes";
import { MANUAL_WORKOUT } from "../../config/actionTypes";
import RAW from "../../api/raw";
import { message } from "antd";

export const getCalendarData = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CALENDAR,
      payload: {
        loading: true,
      },
    });
    
    const response = await RAW.get("/get_user_program", { params: data });
    if (response.data.success) {
      dispatch({
        type: UPDATE_CALENDAR,
        payload: {
          loading: false,
          calendar_data: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: UPDATE_CALENDAR,
        payload: {
          loading: false,
          calendar_data: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_CALENDAR,
      payload: {
        calendar_data: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const addManualWorkout = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANUAL_WORKOUT,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/add_manual_workout", data);

    if (response.data.success) {
      console.log("add_manual_workout calling done");
      message.success(response.data.message);

      dispatch({
        type: MANUAL_WORKOUT,
        payload: {
          loading: false,
          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      dispatch({
        type: MANUAL_WORKOUT,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: MANUAL_WORKOUT,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const reloadCalendarData = (data) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: UPDATE_CALENDAR,
    //   payload: {
    //     loading: true,
    //   },
    // });
    const response = await RAW.get("/get_user_program", { params: data });
    if (response.data.success) {
      dispatch({
        type: UPDATE_CALENDAR,
        payload: {
          loading: false,
          calendar_data: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: UPDATE_CALENDAR,
        payload: {
          loading: false,
          calendar_data: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_CALENDAR,
      payload: {
        calendar_data: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};
