import React from "react";
import { Row, Col, Tag } from "antd";

import imgbanner from "../../../img/recipesbg.jpg";
import { S3_BUCKET_URL } from "../../../config/constants";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const RecipesBanner = ({ recipeData }) => {
  const navigate = useNavigate();
  return (
    <div
      className="new_container"
      style={{
        marginTop: "76px",
      }}
    >
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="recipes-cover-rs">
            <div className="banner-text-rs">
              <div className="">
                <h2>
                  <LeftOutlined onClick={() => navigate(-1)} />{" "}
                  {recipeData.title || "N/A"}
                </h2>

                {/* <p>{recipeData.description}</p> */}
              </div>
            </div>
            <div className="recipes-banner-rs">
              <img
                src={
                  recipeData.banner != null
                    ? S3_BUCKET_URL + recipeData.banner
                    : imgbanner
                }
                alt=""
              />
            </div>
            <div className="tagbtn-rs">
              {recipeData.meal_data &&
                recipeData.meal_data.map((item) => (
                  <Tag className="glutenfee-rs">{item.name}</Tag>
                ))}
              {recipeData.category_data &&
                recipeData.category_data.map((item) => (
                  <Tag className="glutenfeei-rs">{item.name}</Tag>
                ))}
            </div>

            <div className="topline"></div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecipesBanner;
