import React, { useEffect, useRef } from "react";
import { Player } from "video-react";
import HLSSource from "./HLSSource";
import "video-react/dist/video-react.css";
import { useLocation, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getStreamableVideo } from "../redux/actions/VideoStreamingAction";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoPlayer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vidRef=useRef();

  // const { state } = useLocation();
  // const { mediaId, mediaFile } = state;

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo, loading } = VideoState;

  useEffect(() => {
    if (props.mediaId) dispatch(getStreamableVideo(props.mediaId));
  }, [props.mediaId]);

  useEffect(()=>{
    {console.log("props.muted------------",props.muted)}
  },[props.muted])

  useEffect(() => { vidRef.current.pause(); },[]);

  /* useEffect(() => {
    if (mediaFile === null) {
      navigate(-1);
    }
  }, []); */

  return (
    <div className="playvideo-pv">
      {loading ? (
        /* <Spin /> */
        <div style={{
          margin: "20px"
        }}>
          <Skeleton height={400} />
        </div>
      ) : (
        <Player  ref={ vidRef }  muted={props.muted}>
     
          <HLSSource isVideoChild ref={props.ref} src={streamableVideo.url} />
          {/* <source  src={streamableVideo.url} /> */}
        </Player>
      )}
    </div>
  );
};

export default VideoPlayer;
