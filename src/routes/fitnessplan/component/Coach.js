import React from "react";
import { Row, Col } from "antd";

import coachesimg from "../../../img/Captura-de-pantalla.jpg";
import { S3_BUCKET_URL } from "../../../config/constants";

const Coaches = ({ data, index }) => {
  return (
    <div>
      {index % 2 == 0 ? (
        <div className="coaches-cwd active">
          <Row
            gutter={[10, 10]}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col xs={24} sm={24} md={6} lg={6}>
              <div className="coaches-img-cwd">
                <img
                  src={
                    Boolean(data.profile_pic) ? S3_BUCKET_URL+data.profile_pic : coachesimg
                  }
                  alt="coach"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18}>
              <div className="coaches-text-cwd">
                <h2>{data.name}</h2>
                <p>
                  {data.coache_social && data.coache_social.about_us}
                </p>
                <div className="soclicon">
                  <p>
                    <a
                      href={`https://www.facebook.com/${
                        data.coache_social && data.coache_social.facebook
                      }`}
                      target="_blank"
                    >
                      <i
                        className="fa fa-facebook-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://www.instagram.com/${
                        data.coache_social && data.coache_social.instagram
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://twitter.com/${
                        data.coache_social && data.coache_social.twitter
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://in.pinterest.com/${
                        data.coache_social && data.coache_social.pinterest
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://www.youtube.com/${
                        data.coache_social && data.coache_social.youtube
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="coaches-cwd ">
          <Row
            gutter={[10, 10]}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Col xs={24} sm={24} md={18} lg={18}>
              <div className="coaches-text-cwd text-right-cwd">
                <h2>{data.name}</h2>
                <p>
                {data.coache_social && data.coache_social.about_us}
                </p>
                <div className="soclicon">
                  <p>
                    <a
                      href={`https://www.facebook.com/${
                        data.coache_social && data.coache_social.facebook
                      }`}
                      target="_blank"
                    >
                      <i
                        className="fa fa-facebook-square"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://www.instagram.com/${
                        data.coache_social && data.coache_social.instagram
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://twitter.com/${
                        data.coache_social && data.coache_social.twitter
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://in.pinterest.com/${
                        data.coache_social && data.coache_social.pinterest
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`https://www.youtube.com/${
                        data.coache_social && data.coache_social.youtube
                      }`}
                      target="_blank"
                    >
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <div className="coaches-img-cwd">
                <img src={Boolean(data.profile_pic) ? S3_BUCKET_URL+data.profile_pic : coachesimg}></img>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Coaches;
