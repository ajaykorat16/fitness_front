import React, { useEffect } from "react";
import { Row, Col, Spin, Input, Pagination } from "antd";
import coachingimg from "../../img/coachingd.jpg";
import { LeftOutlined, HistoryOutlined } from "@ant-design/icons";
import clockicon from "../../img/clock.png";
import ashleyicon from "../../img/ashley.png";
import VideoLive from "./component/VideoLive";
const CoachingArticle = () => {
  const { Search } = Input;
  function showTotal(total) {
    return `Total ${total} items`;
  }
  return (
    <div>
      <div className="side_container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="rp-right-profile">
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="searchbar_f">
                    <Search placeholder="Search" />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="banner-text-rs">
                    <h2>
                      <LeftOutlined /> DAILY WELLNESS JOURNAL TEMPLATE
                    </h2>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="coaching-artical-img">
                    <img src={coachingimg}></img>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="date-user-high">
                    <div className="date-duh">
                      <img src={clockicon}></img>
                      <p> March 17, 2021</p>
                    </div>
                    <div className="date-duh">
                      <img src={ashleyicon}></img>
                      <p>
                        By
                        <b> Ashley</b>
                      </p>
                    </div>
                    <div className="gulten-duh">
                      <p>Gluten-Free</p>
                      <p>High-Protein</p>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="bottom-line"></div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="coaching-artical-para">
                    <ul>
                      <li>
                        <p>
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32.
                        </p>
                      </li>
                      <li>
                        <p>
                          The standard chunk of Lorem Ipsum used since the 1500s
                          is reproduced below for those interested. Sections
                          1.10.32 and 1.10.33 from "de Finibus Bonorum et
                          Malorum" by Cicero are also reproduced in their exact
                          original form, accompanied by English versions from
                          the 1914 translation by H. Rackham.
                        </p>
                      </li>
                      <li>
                        <p>
                          Interdum et malesuada fames ac ante ipsum primis in
                          faucibus. Phasellus feugiat lobortis eleifend. Nulla
                          sit amet metus at metus euismod feugiat. Fusce
                          fringilla libero lectus, eu ultrices sapien tincidunt
                          nec. Sed quis libero lobortis nisl aliquet hendrerit.
                          Ut ut scelerisque purus. Nam placerat sollicitudin
                          magna, vitae imperdiet felis vestibulum ut. Maecenas
                          neque enim, lobortis sed erat sit amet, suscipit
                          venenatis ante. Sed ultricies vitae nunc luctus
                          sollicitudin. Aenean nec pellentesque dui. Quisque
                          aliquam gravida lobortis.
                        </p>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="livesessions-f">
                    <h2>Video galery</h2>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <VideoLive />
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <VideoLive />
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <VideoLive />
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <VideoLive />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CoachingArticle;
