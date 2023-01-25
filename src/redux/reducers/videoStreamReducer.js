import { MANAGE_VIDEO_STREAM } from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  streamableVideo: {},
  successMessage: "",
  errorMessage: "",
};

const videoStreamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MANAGE_VIDEO_STREAM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default videoStreamReducer;
