import {
  ALL_CHALLENGES,
  CHALLENGES_DETAILS,
  DASHBOARD_CHALLENGE,
} from "../../config/actionTypes";
import RAW from "../../api/raw";
import { message } from "antd";

export const getAllChallenges = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_CHALLENGES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/get_challenge");
    if (response.data.success) {
      dispatch({
        type: ALL_CHALLENGES,
        payload: {
          loading: false,
          challenge: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: ALL_CHALLENGES,
        payload: {
          loading: false,
          challenge: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: ALL_CHALLENGES,
      payload: {
        challenge: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getChallengesDetails = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/challenge_details", data);
    if (response.data.success) {
      dispatch({
        type: CHALLENGES_DETAILS,
        payload: {
          loading: false,
          details: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: CHALLENGES_DETAILS,
        payload: {
          loading: false,
          details: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        details: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

// **********************************

export const ChallengeSignUpRq = (data) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: CHALLENGES_DETAILS,
    //   payload: {
    //     loading: true,
    //   },
    // });
    const response = await RAW.post("/add_user_challenge", data);
    console.log("add_user_challenge----------------", response);
    if (response.data.success) {
      //   dispatch({
      //     type: CHALLENGES_DETAILS,
      //     payload: {
      //       loading: false,
      //       details: response.data.data,
      //       successMessage: response.data.message,
      //     },
      //   });
      message.success(response.data.message);
    } else {
      //   dispatch({
      //     type: CHALLENGES_DETAILS,
      //     payload: {
      //       loading: false,
      //       details: [],
      //       errorMessage: response.data.message,
      //     },
      //   });

      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        details: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const leaveChallenges = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/leave_challenge", data);
    if (response.data.success) {
      dispatch({
        type: CHALLENGES_DETAILS,
        payload: {
          loading: false,
          details: response.data.data,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    
    } else {
      dispatch({
        type: CHALLENGES_DETAILS,
        payload: {
          loading: false,
          details: [],
          errorMessage: response.data.message,
        },
      });
      message.error(response.data.message);

    }
  } catch (err) {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        details: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const completeChallenges = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/complete_challenge", data);
    if (response.data.success) {
      dispatch({
        type: CHALLENGES_DETAILS,
        payload: {
          loading: false,
          details: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: CHALLENGES_DETAILS,
        payload: {
          loading: false,
          details: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CHALLENGES_DETAILS,
      payload: {
        details: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

// dashboard_challenge

export const dashboardChallenge = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DASHBOARD_CHALLENGE,
      payload: {
        loading: true,
      },
    });

    const response = await RAW.get("/dashboard_challenge");
    if (response.data.success) {
      dispatch({
        type: DASHBOARD_CHALLENGE,
        payload: {
          loading: false,
          dashboard: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: DASHBOARD_CHALLENGE,
        payload: {
          loading: false,
          dashboard: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: DASHBOARD_CHALLENGE,
      payload: {
        dashboard: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};
