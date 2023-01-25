import React from "react";
import { Row, Col } from "antd";
import { EditOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";
import black from "../../../img/unsplash_Uzsw3pgiOPE.png";
import { S3_BUCKET_URL } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RecipeComplete } from "../../../redux/actions/recipesAction";
import { ChangeRecipe, userDetailData } from "../../../redux/actions/user";
import { getMyPlanSideBar } from "../../../redux/actions/dashboardAction";
import pen from "../../../img/pen.svg";

const MenuItem = ({
  data,
  program_id,
  complete,
  setIsPopupVisible,
  setChangeProgram,
  setChangeProgramD,
  setChangeOldID,
  program_date,
  program_id1,
  setChangeRecipeName,
  setRecipeload,
  filterDate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("filterDAte--------", filterDate);

  const recipeComplete = () => {
    dispatch(RecipeComplete(data.id, program_id));
    dispatch(userDetailData(navigate));
    dispatch(
      getMyPlanSideBar({ start_date: filterDate, end_date: filterDate })
    );
  };

  return (
    <div className="menuthumnail_mt dasmenu-l">
      <Row gutter={[0, 0]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail_img img_size">
            <img
              src={data.banner != null ? S3_BUCKET_URL + data.banner : black}
              alt=""
            />
            <div className="recp_hding-rh">
              {data.meal_data &&
                data.meal_data.map((item, index) => (
                  <b key={index}>
                    {item.name == "Dinner"
                      ? "D"
                      : item.name == "Lunch"
                      ? "L"
                      : item.name == "Breakfast"
                      ? "BF"
                      : "SN"}
                  </b>
                ))}
              <h4>{data ? data.title.substring(0, 20) : "N/A"}</h4>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="menuthumnail-text">
            <Row gutter={[5, 5]}>
              {data.category_data &&
                data.category_data.map((item, i) => (
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <p className="gluten-free">{item.name}</p>
                  </Col>
                ))}
            </Row>
            <div className="menuthumnail-num-mt">
              <div className="menuthumnail-minutes-mt">
                <h4>{Math.trunc(data.calorie) || 0}</h4>
                <p>calories</p>
              </div>
              <div className="menuthumnail-minutes-mt">
                <div className="carbs-num-all">
                  <p className="carbs-line">carbs</p>
                  <p className="crbnumline">{data.carbs || "0"}g</p>
                </div>
                <div className="carbs-num-all">
                  <p className="carbs-line">protein</p>
                  <p className="crbnumline">{data.protein || "0"}g</p>
                </div>
                <div className="carbs-num-all">
                  <p className="carbs-line">fat</p>
                  <p className="crbnumline">{data.saturated_fat || "0"}g</p>
                </div>
              </div>
            </div>

            <Row gutter={[5, 5]}>
              <Col xs={8} sm={8} md={8} lg={8}>
                <div
                  className="menuthumnail-icons-mt"
                  onClick={async () => {
                    setRecipeload(true);
                    setChangeRecipeName(data && data.title);
                    setChangeProgram(program_id1);
                    setChangeProgramD(program_date);
                    setChangeOldID(data.id);
                    setIsPopupVisible(true);
                    await dispatch(
                      ChangeRecipe({ id: data.uuid, user_id: data.user.id })
                    );
                    setRecipeload(false);
                  }}
                >
                  {/* <EditOutlined /> */}

                  <img
                    style={{
                      fontWaight: "800",

                      marginRight: "5px",
                      height: "11px",
                    }}
                    src={pen}
                    alt="pen"
                  />
                  <h6>Change</h6>
                </div>
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                {Boolean(complete) && complete != 0 ? (
                  <div className="menuthumnail-icons-mt">
                    <CheckOutlined
                      style={{
                        fontWaight: "800",
                      }}
                    />
                    <h6>Eaten</h6>
                  </div>
                ) : (
                  <div
                    className="menuthumnail-icons-mt"
                    onClick={recipeComplete}
                  >
                    {/* <CheckOutlined /> */}
                    <h6>Eaten</h6>
                  </div>
                )}
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                <div
                  className="menuthumnail-icons-mt"
                  onClick={() => navigate(`/recipe-details/${data.id}`)}
                >
                  <EyeOutlined
                    style={{
                      fontWaight: "800",
                    }}
                  />
                  <h6>View</h6>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MenuItem;
