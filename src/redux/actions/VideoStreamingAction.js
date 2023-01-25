import { MANAGE_VIDEO_STREAM } from "../../config/actionTypes";
import RAW from "../../api/raw";

export const getStreamableVideo = (media_id, data) => async (dispatch) => {
  try {
    console.log(media_id);
    dispatch({
      type: MANAGE_VIDEO_STREAM,
      payload: {
        loading: true,
        streamableVideo: {},
      },
    });
    const response = await RAW.get("get_video_streaming/" + media_id+data);

    if (response.data.success) {
      dispatch({
        type: MANAGE_VIDEO_STREAM,
        payload: {
          loading: false,
          streamableVideo: response.data.data,
        },
      });
    } else {
      dispatch({
        type: MANAGE_VIDEO_STREAM,
        payload: {
          loading: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
    }
  } catch (err) {
    console.log(err, "video stream api error");
    dispatch({
      type: MANAGE_VIDEO_STREAM,
      payload: {
        oading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
