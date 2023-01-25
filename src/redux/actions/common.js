import { ADDRESS_MANAGE } from "../../config/actionTypes";
import RAW from "../../api/raw";

export const getCountries = () => async (dispatch, getState) => {
  try {
    const response = await RAW.get("/country");
    response.data.success
      ? dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            countries: response.data.data,
          },
        })
      : dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: ADDRESS_MANAGE,
      payload: {
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getStates =
  (country_id = null) =>
  async (dispatch, getState) => {
    try {
      const response = await RAW.get("/state", {
        params: {
          country_id: country_id,
        },
      });
      if (response.data.success) {
        dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            states: response.data.data,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ADDRESS_MANAGE,
        payload: {
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const getCities =
  (state_id = null) =>
  async (dispatch, getState) => {
    try {
      const response = await RAW.get("/city", {
        params: {
          state_id: state_id,
        },
      });
      if (response.data.success) {
        dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            cities: response.data.data,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: ADDRESS_MANAGE,
        payload: {
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const getHeights = () => async (dispatch, getState) => {
  try {
    const response = await RAW.get("/height");
    response.data.success
      ? dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            height: response.data.data,
          },
        })
      : dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            height: [],
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: ADDRESS_MANAGE,
      payload: {
        height: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getActivityLevel = () => async (dispatch, getState) => {
  try {
    const response = await RAW.get("/activity_level");
    response.data.success
      ? dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            activityLevel: response.data.data,
          },
        })
      : dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            activityLevel: [],
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: ADDRESS_MANAGE,
      payload: {
        activityLevel: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const getFitnessGoal = () => async (dispatch, getState) => {
  try {
    const response = await RAW.get("/get_fitness");
    response.data.success
      ? dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            fitnessGoal: response.data.data,
          },
        })
      : dispatch({
          type: ADDRESS_MANAGE,
          payload: {
            fitnessGoal: [],
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type: ADDRESS_MANAGE,
      payload: {
        fitnessGoal: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};
