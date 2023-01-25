import React from "react";
import { Row, Col, Image } from "antd";
import { ClockCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
// import imgvideo from "../../../img/unsplash_lrQPTQs7nQQ.jpg";
import imgvideo from "../../../img/8.svg";
// import videoimg from "../../../img/8.svg";
import { S3_BUCKET_URL } from "../../../config/constants";
import { useNavigate } from "react-router-dom";

const Workout = ({ data, modalShow, videoId }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="workmain-video liveview-vl">
        <Row gutter={[0, 0]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div
              className="liveplayvideo-lg0"
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image
                src={
                  data.programmable.banner
                    ? S3_BUCKET_URL + data.programmable.banner
                    : imgvideo
                }
                preview={false}
              />

              <PlayCircleOutlined
                className="player-video-pvp"
                style={{ fontSize: "32px" }}
                onClick={() => {
                  modalShow(true);
                  videoId(data.id);
                }}
              />
            </div>
            {/* <div
              className="liveplayvideo-lg0"
              style={{
                width: "100%",
                height: "190px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image
                src={
                  data.programmable.banner
                    ? S3_BUCKET_URL + data.programmable.banner
                    : imgvideo
                }
                alt="workout-banner"
                style={{
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onClick={() => {
                  if (data.programmable_type === "App\\Models\\Workout") {
                    navigate("/workout-details/" + data.programmable_id);
                  } else {
                    navigate("/recipe-details/" + data.programmable_id);
                  }
                }}
              />
            </div> */}
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div
              className="livetext-vl"
              style={{
                background: "#F9F9F9",
                height: "111px",
              }}
            >
              <span className="livemain-vl">
                <h2>{data.programmable.title}</h2>
                <p style={{ fontWeight: "bold" }}>category</p>
                <p>
                  {data.programmable.category_data &&
                    data.programmable.category_data.map((item, i) =>
                      i === data.programmable.category_data.length - 1
                        ? item.name
                        : item.name + ", "
                    )}
                </p>
              </span>
              {data.programmable_type === "App\\Models\\Workout" ? (
                <span class="livemain-vl">
                  {/* <p style={{ fontWeight: "bold" }}>equipments</p> */}
                  <p>
                    {data.programmable.equipment_data &&
                      data.programmable.equipment_data.map((item, i) =>
                        i === data.programmable.equipment_data.length - 1
                          ? item.name
                          : item.name + ", "
                      )}
                  </p>
                </span>
              ) : null}
              <div className="icons_btn-vltops">
                <p>
                  <ClockCircleOutlined
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  {new Date(parseInt(data.programmable.duration || 0) * 1000)
                    .toISOString()
                    .substr(11, 8) || "00"}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Workout;
