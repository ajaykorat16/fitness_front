import { UPDATE_NUTRITION_CALCULATOR } from "../../../config/actionTypes";
import RAW from "../../../api/raw";
import { message } from "antd";

//NUTRITION CALCULATOR --- START
export const getNutritionData = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.get("get_nutrition", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_NUTRITION_CALCULATOR,
        payload: {
          nutritionData:
            response.data.data != null
              ? response.data.data
              : {
                  neck: "",
                  waist: "",
                  hip: "",
                  bicep: "",
                  chest: "",
                  thigh: "",
                  calf: "",
                  height_id: "",
                  body_fat: "",
                  current_weight: "",
                  target_weight: "",
                  target_date: "",
                  inch: "",
                  feet:"",
                  gender:"",
                  fitness_goal:"",
                  activity_id:""
                },
          successMessage: response.data.message,
        },
      });
    } else {
      dispatch({
        type: UPDATE_NUTRITION_CALCULATOR,
        payload: {
          nutritionData: {},
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_NUTRITION_CALCULATOR,
      payload: {
        nutritionData: {},
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const saveNutritionFormData = (data,path,navigate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_NUTRITION_CALCULATOR,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("add_nutrition", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_NUTRITION_CALCULATOR,
        payload: {
          loading: false,
          nutritionData: response.data.data,
          successMessage: response.data.message,
        },
      });
      if (path == "firstLogin") navigate("/wellness-profile", { state: { path: "firstLogin" } });
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
      dispatch({
        type: UPDATE_NUTRITION_CALCULATOR,
        payload: {
          loading: false,
          nutritionData: {},
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    message.error("Error: " + err);
    dispatch({
      type: UPDATE_NUTRITION_CALCULATOR,
      payload: {
        loading: false,
        nutritionData: {},
        errorMessage: "Error: " + err,
      },
    });
  }
};
//NUTRITION CALCULATOR --- END
