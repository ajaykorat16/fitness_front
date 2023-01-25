import React from "react";
import { Row, Col, Button } from "antd";
import { EditOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";
import black from "../../../img/unsplash_Uzsw3pgiOPE.png";
import { S3_BUCKET_URL } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RecipeComplete } from "../../../redux/actions/recipesAction";
import { userDetailData } from "../../../redux/actions/user";

const ChooseManu = ({ data, setChangeNewID,recipeChangeReq }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recipeChange = () => {
    setChangeNewID(data.recipeID);
    // dispatch(RecipeComplete(data.id,program_id))
    // dispatch(userDetailData(navigate));
  };

  return (
    <div className="menuthumnail_mt dasmenu-l" onClick={() => recipeChange()}>
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail_img img_size">
            <img src={data.mainImage != null ? data.mainImage : black} alt="" />
            <div className="recp_hding-rh">
              <b>{data && data.mealTags && data.mealTags[0] == "Dinner"
                        ? "D"
                        : data && data.mealTags && data.mealTags[0] == "Lunch"
                        ? "L"
                        : data && data.mealTags && data.mealTags[0] == "Breakfast"
                        ? "BF"
                        : "SN"}</b>

              <h4>{data ? data.name : ""}</h4>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail-text">
            
            <div className="menuthumnail-num-mt">
              <div className="menuthumnail-minutes-mt">
                <h4>
                  {(data &&
                    data.nutrientsPerServing &&
                    data.nutrientsPerServing.calories) ||
                    " "}
                </h4>
                <p>calories</p>
              </div>
              <div className="menuthumnail-minutes-mt">
                <div className="carbs-num-all">
                  <p className="carbs-line">carbs</p>
                  <p className="crbnumline">
                    {(data &&
                      data.nutrientsPerServing &&
                      data.nutrientsPerServing.carbs) ||
                      " "}
                    g
                  </p>
                </div>
                <div className="carbs-num-all">
                  <p className="carbs-line">protein</p>
                  <p className="crbnumline">
                    {(data &&
                      data.nutrientsPerServing &&
                      data.nutrientsPerServing.protein) ||
                      " "}
                    g
                  </p>
                </div>
                <div className="carbs-num-all">
                  <p className="carbs-line">fat</p>
                  <p className="crbnumline">
                    {(data &&
                      data.nutrientsPerServing &&
                      data.nutrientsPerServing.saturatedFat) ||
                      " "}
                    g
                  </p>
                </div>
              </div>
            </div>

            <Row gutter={[5, 5]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="menuthumnail-icons-mt"  onClick={() => recipeChangeReq(data.recipeID)}>
                    <h6>confirm</h6>
                  </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChooseManu;
