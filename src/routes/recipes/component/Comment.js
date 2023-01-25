import React from "react";
import { Row, Col, Input, Button } from "antd";
import profileimg from "../../../img/profile.png";
const Comment = () => {
  return (
    <div className="comment-main-cmm">
      <Row gutter={[10, 10]}>
        <Col xs={5} sm={5} md={2} lg={2}>
          <div className="comment-img-cii">
            <img src={profileimg} alt="" />
          </div>
        </Col>
        <Col xs={19} sm={19} md={22} lg={22}>
          <div className="commentimg-heading-cci">
            <h2>John Doe</h2>
            <p>
              The standard chunk of Lorem Ipsum used since the 1500s is
              reproduced below for those interested. Sections 1.10.32 and
              1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
              reproduced in their exact original form, accompanied by English
              versions from the 1914 translation by H. Rackham.
            </p>
          </div>
          <div className="comment-like-cl">
            <p>
              1.229k
              <b>
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
              </b>
            </p>
            <p>
              13
              <b>
                <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
              </b>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
