import { UPDATE_WELLNESS_QUESTIONS } from "../../../config/actionTypes";
import RAW from "../../../api/raw";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const getQuestioner = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.get("/questions", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_WELLNESS_QUESTIONS,
        payload: {
          wellnessQuestions: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: UPDATE_WELLNESS_QUESTIONS,
        payload: {
          wellnessQuestions: [],
          errorMessage: response.data.message,
        },
      });

      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_WELLNESS_QUESTIONS,
      payload: {
        wellnessQuestions: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const addQuestioner = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_WELLNESS_QUESTIONS,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/add_user_response", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_WELLNESS_QUESTIONS,
        payload: {
          //wellnessQuestions: response.data.data,
          loading: false,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
      
    } else {
      dispatch({
        type: UPDATE_WELLNESS_QUESTIONS,
        payload: {
          loading: false,
          wellnessQuestions: [],
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_WELLNESS_QUESTIONS,
      payload: {
        loading: false,
        wellnessQuestions: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};
