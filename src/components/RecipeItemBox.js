import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  StarOutlined,
  CalendarOutlined,
  EyeOutlined,
  StarFilled,
} from "@ant-design/icons";
import black from "../img/8.svg";
import moment from "moment";

import { addNewSchedule } from "../redux/actions/fitnessAction";
import { useDispatch, useSelector } from "react-redux";
import { S3_BUCKET_URL } from "../config/constants";
import {
  addToFavouriteRecipe,
  favTodayRecipe,
  recommendedRecipe,
} from "../redux/actions/recipesAction";
import AddToCalendar from "./AddToCalendar";

const RecipeItemBox = ({ data, path }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flag, setFlag] = useState(false);

  const workoutState = useSelector((state) => state.fitness);
  const { loading } = workoutState;

  const [payload, setPayload] = useState({
    programmable_user_type: "App\\Models\\Recipe",
    programmable_user_id: data && data.id,
    program_date: moment().format("Y-MM-D"),
  });

  const addRecipeToCalendar = async (target_date) => {
    const newPayload = await {
      ...payload,
      program_date: target_date.format("YYYY-MM-DD"),
    };
    dispatch(addNewSchedule(newPayload));
    setFlag(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (flag) navigate("/calendar");
  }, [flag]);

  return (
    <div>
      <div className="menuthumnail_mt">
        <Row gutter={[0, 0]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="menuthumnail_img">
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000",
                  objectFit: "cover",
                }}
                src={
                  data && data.thumbnail && data.thumbnail != null
                    ? S3_BUCKET_URL + data.thumbnail
                    : black
                }
                alt=""
              />
              <div className="recp_hding-rh">
                {data &&
                  data.meal_data &&
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

                <h4>{data ? data.title : "N/A"}</h4>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="menuthumnail-text">
              <Row gutter={[5, 5]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <p className="gluten-free">
                    {/* {data.category_data &&
                      data.category_data.map((item, i) =>
                        i === data.category_data.length - 1
                          ? item.name
                          : item.name + ","
                      )} */}
                  </p>
                </Col>
              </Row>
              {/* <p className="livedes-vl">
                {data && data.description && data.description.length > 150
                  ? data.description.substring(0, 150)
                  : data.description}
                ...
              </p> */}
              <div className="menuthumnail-num-mt">
                <div className="menuthumnail-minutes-mt">
                  <h4>{data && data.calorie}</h4>
                  <p>Calories</p>
                </div>
                <div className="menuthumnail-minutes-mt">
                  {/* <h4>{data && data ? data && data.calorie : ""}</h4> */}
                  <div className="carbs-num-all">
                    <p className="carbs-line">carbs</p>
                    <p className="crbnumline">
                      {(data && data.carbs) || "N/A"}g
                    </p>
                  </div>
                  <div className="carbs-num-all">
                    <p className="carbs-line">protein </p>
                    <p className="crbnumline">
                      {(data && data.protein) || "N/A"}g
                    </p>
                  </div>
                  <div className="carbs-num-all">
                    <p className="carbs-line">fat</p>
                    <p className="crbnumline">
                      {(data && data.saturated_fat) || "N/A"}g
                    </p>
                  </div>
                </div>
              </div>

              <Row gutter={[5, 5]}>
                <Col xs={24} sm={24} md={14} lg={14}>
                  <div className="high-recip">
                    <p className="gul-free-0">
                      {data.category_data &&
                        data.category_data.map((item, i) =>
                          i === data.category_data.length - 1
                            ? item.name
                            : item.name + ","
                        )}
                    </p>
                    {/* <p className="gul-free-0">Gluten-Free</p> */}
                    {/* <p className="gul-free-0">Gluten-Free</p> */}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={10} lg={10}>
                  <div className="icons-recipe">
                    {data.is_favorite_count == 1 ||
                    (data.is_favorite && data.is_favorite.length == 1) ||
                    data.is_favorite == 1 ? (
                      <StarFilled
                        onClick={() => {
                          path == "details"
                            ? dispatch(recommendedRecipe(data.id))
                            : path == "today_recipe"
                            ? dispatch(favTodayRecipe(data.id))
                            : dispatch(addToFavouriteRecipe(data.id));
                        }}
                      />
                    ) : (
                      <StarOutlined
                        onClick={() => {
                          path == "details"
                            ? dispatch(recommendedRecipe(data.id))
                            : path == "today_recipe"
                            ? dispatch(favTodayRecipe(data.id))
                            : dispatch(addToFavouriteRecipe(data.id));
                        }}
                      />
                    )}

                    <EyeOutlined
                      onClick={() => navigate(`/recipe-details/${data.id}`)}
                    />

                    <modal
                      visible={isModalVisible}
                      footer={null}
                      className="calendarfull-cf"
                    >
                      <CalendarOutlined
                        onClick={() => setIsModalVisible(true)}
                      />
                    </modal>
                  </div>

                  <AddToCalendar
                    isModalVisible={isModalVisible}
                    setIsModalVisible={closeModal}
                    addToCalendar={addRecipeToCalendar}
                    buttonLoading={loading}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RecipeItemBox;
