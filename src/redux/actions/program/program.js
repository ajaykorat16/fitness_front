import {
  UPDATE_PROGRAM,
  UPDATE_USER_PROGRAM_COUNT,
} from "../../../config/actionTypes";
import RAW from "../../../api/raw";
import { message } from "antd";
import axios from "axios";
import { SUGGESTIC } from "../../../config/constants";

export const getPrograms = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/get_programs", { params: data });
    if (response.data.success) {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          all_programs: response.data.data.all_programs.data,
          suggested_programs: response.data.data.suggested_program,
          successMessage: response.data.message,
          loading: false,
        },
      });
    } else {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          programs: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        programs: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

// **************************

export const signUpProgramBySuggestic = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: true,
        // clashCheckFlag: false,
      },
    });
    const response = await axios.post(SUGGESTIC+"recipe", data);
    if (response.data.success) {
      message.success("Program is add successful");
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          signupFlag: true,
          successMessage: response.data.message,
        },
      });
      // dispatch({
      //   type: UPDATE_USER_PROGRAM_COUNT,
      //   payload: 1,
      // });
    } else {
      message.error(response.data.message);
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          signupFlag: false,
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    console.log("Error: " + err);
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: false,
        signupFlag: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const signUpForProgram = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: true,
        clashCheckFlag: false,
      },
    });
    const response = await RAW.post("/add_user_program", data);
    if (response.data.success) {
      // message.success(response.data.message);
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          signupFlag: false,
          successMessage: response.data.message,
        },
      });
      dispatch({
        type: UPDATE_USER_PROGRAM_COUNT,
        payload: 1,
      });
    } else {
      message.error(response.data.message);
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          signupFlag: false,
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    console.log("Error: " + err);
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: false,
        signupFlag: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const checkProgramClash = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/check_if_any_program", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          clashCheckFlag: true,
          clashedProgramsCount: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          clashCheckFlag: false,
          clashedProgramsCount: 0,
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: false,
        clashCheckFlag: false,
        clashedProgramsCount: 0,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const changeSignUpFlag = (flag) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROGRAM,
    payload: {
      signupFlag: flag,
    },
  });
};

export const changeClashCheckFlag = (flag) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROGRAM,
    payload: {
      clashCheckFlag: flag,
    },
  });
};

export const filterProgram = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/get_filter", data);
    if (response.data.success) {
      console.log("fffff", response.data.success);
      console.log("food", response.data.data);
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          all_programs: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          all_programs: [],
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: false,
        all_programs: [],
        errorMessage: "Error" + err,
      },
    });
  }
};

export const getSubscriptionPlans = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        plansLoading: true,
      },
    });
    const response = await RAW.get("/get_subscription");
    if (response.data.success) {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          subscription_plans: response.data.data,
          plansLoading: false,
        },
      });
    } else {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          plansLoading: false,
          subscription_plans: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        plansLoading: false,
        subscription_plans: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getProgramDetails = (prgrm_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get(`/get_programs/${prgrm_id}`);
    if (response.data.success) {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          programDetails: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: UPDATE_PROGRAM,
        payload: {
          loading: false,
          programDetails: {},
          successMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};
