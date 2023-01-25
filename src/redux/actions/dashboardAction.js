import {  GET_MYPLAN_SIDE_BAR } from "../../config/actionTypes";
import RAW from "../../api/raw";

export const getMyPlanSideBar = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.get("/get_user_program_average",{ params: data});
    response.data.success
      ? dispatch({
          type: GET_MYPLAN_SIDE_BAR,
          payload: {
            myPlan: response.data.data,
          },
        })
      : dispatch({
          type:  GET_MYPLAN_SIDE_BAR,
          payload: {
            myPlan: [],
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type:  GET_MYPLAN_SIDE_BAR,
      payload: {
        myPlan: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};


export const getSetps = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.post("/get_all_step",data);
    console.log("response getsteps-------------------",response.data)
    response.data.success
      ? dispatch({
          type: GET_MYPLAN_SIDE_BAR,
          payload: {
            steps: response.data.data,
          },
        })
      : dispatch({
          type:  GET_MYPLAN_SIDE_BAR,
          payload: {
            steps: {},
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type:  GET_MYPLAN_SIDE_BAR,
      payload: {
        steps: {},
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const SetpsProgress = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.post("/save_daily_steps",data);
    response.data.success
    ? dispatch({
        type: GET_MYPLAN_SIDE_BAR,
        payload: {
          steps: response.data.data,
        },
      })
    : dispatch({
        type:  GET_MYPLAN_SIDE_BAR,
        payload: {
          steps: {},
          errorMessage: "Error: " + response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type:  GET_MYPLAN_SIDE_BAR,
      payload: {
        steps: {},
        errorMessage: "Error: " + err,
      },
    });
  }
};


export const StepsProgressSet = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.post("/save_daily_steps_progress",data);
  
  } catch (err) {
    
  }
};

// ************************************************************

export const getWater = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.post("/get_all_water",data);
    console.log("response getsteps-------------------",response.data)
    response.data.success
      ? dispatch({
          type: GET_MYPLAN_SIDE_BAR,
          payload: {
            water: response.data.data,
          },
        })
      : dispatch({
          type:  GET_MYPLAN_SIDE_BAR,
          payload: {
            water: {},
            errorMessage: "Error: " + response.data.message,
          },
        });
  } catch (err) {
    dispatch({
      type:  GET_MYPLAN_SIDE_BAR,
      payload: {
        water: {},
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const WaterProgress = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.post("/save_daily_water",data);
    response.data.success
    ? dispatch({
        type: GET_MYPLAN_SIDE_BAR,
        payload: {
          water: response.data.data,
        },
      })
    : dispatch({
        type:  GET_MYPLAN_SIDE_BAR,
        payload: {
          water: {},
          errorMessage: "Error: " + response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type:  GET_MYPLAN_SIDE_BAR,
      payload: {
        water: {},
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const WaterProgressSet = (data) => async (dispatch, getState) => {
  try {
    const response = await RAW.post("/save_daily_water_progress",data);
  
  } catch (err) {
    
  }
};