import { FORGET_PASS_VALID } from "../../config/actionTypes";
import RAW from "../../api/raw";
import { message } from "antd";

export const forgetPasswordVerify = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORGET_PASS_VALID,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/is-valid-token", data);
    if (response.data.success) {
      dispatch({
        type: FORGET_PASS_VALID,
        payload: {
          check_valid: true,
          loading: false,
          errorMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: FORGET_PASS_VALID,
        payload: {
          check_valid: false,
          loading: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: FORGET_PASS_VALID,
      payload: {
        loading: false,
        check_valid: false,
        errorMessage: "Error: " + err,
      },
    });
    message.error("Error: " + err);
  }
};

export const changePassword = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORGET_PASS_VALID,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/reset-password", data);
    if (response.data.success) {
      dispatch({
        type: FORGET_PASS_VALID,
        payload: {
          password_changed: true,
          loading: false,
          errorMessage: response.data.message,
        },
      });
    } else {
      message.error(response.data.message);
      dispatch({
        type: FORGET_PASS_VALID,
        payload: {
          password_changed: false,
          loading: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: FORGET_PASS_VALID,
      payload: {
        loading: false,
        password_changed: false,
        errorMessage: "Error: " + err,
      },
    });
    message.error("Error: " + err);
  }
};
