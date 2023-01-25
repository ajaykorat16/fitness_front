import { Col, Row, Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import pen from "../../../img/penss.png";

const AddNew = ({
  isAddNewVisible,
  handleAddNewCancel,
  showManualWorkoutModal,
  showManualRecipeModal,
}) => {
  return (
    <Modal
      visible={isAddNewVisible}
      onCancel={handleAddNewCancel}
      className="createrecipes-cr"
      footer={null}
    >
      <div className="">
        <Row
          gutter={[0, 0]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col xs={24} sm={24} md={18} lg={18}>
            <Row gutter={[10, 10]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="workout-create-wc">
                  <p
                    style={{
                      // fontFamily: "Termina",
                      fontStyle: "normal",
                      fontWeight: "900",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                  >
                    Workouts
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Link to="/workouts">
                  <div className="search-create-sc">
                    <h2>Search Workout</h2>
                    <SearchOutlined />
                  </div>
                </Link>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div
                  className="search-create-sc"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleAddNewCancel();
                    showManualWorkoutModal();
                  }}
                >
                  <h2>Manual Workout</h2>

                  <img
                    style={{
                      fontWaight: "800",

                      marginLeft: "12px",
                      height: "16px",
                    }}
                    src={pen}
                    alt="pen"
                  />
                  {/* <EditOutlined /> */}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="workout-create-wc">
                  <p
                    style={{
                      // fontFamily: "Termina",
                      fontStyle: "normal",
                      fontWeight: "900",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                  >
                    Foods /Recipes
                  </p>
                </div>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Link to="/recipes">
                  <div className="search-create-sc">
                    <h2>Search Recipes</h2>
                    <SearchOutlined />
                  </div>
                </Link>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <div
                  className="search-create-sc"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleAddNewCancel();
                    showManualRecipeModal();
                  }}
                >
                  <h2>Create Recipes</h2>
                  {/* <EditOutlined /> */}
                  <img
                    style={{
                      fontWaight: "800",

                      marginLeft: "12px",
                      height: "16px",
                    }}
                    src={pen}
                    alt="pen"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default AddNew;
