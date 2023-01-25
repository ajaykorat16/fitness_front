import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Modal } from "antd";
import RecipesBanner from "./component/RecipesBanner";
import IngredientsRecipes from "./component/IngredientsRecipes";
import CookingInstructions from "./component/CookingInstructions";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipeDetails } from "../../redux/actions/recipesAction";
import { useSelector } from "react-redux";
import RecipeItemBox from "../../components/RecipeItemBox";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { S3_BUCKET_URL } from "../../config/constants";
import imgbanner from "../../img/recipesbg.jpg";
import ReactHlsPlayer from "react-hls-player/dist";
import { getStreamableVideo } from "../../redux/actions/VideoStreamingAction";
import { PlayCircleOutlined } from "@ant-design/icons";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [videoID, setVideoId] = useState(null);

  const recipeState = useSelector((state) => state.recipes);
  const { recipeDetails, loading } = recipeState;

  const playerRef = React.useRef();

  const VideoState = useSelector((state) => state.streamableVideo);
  const { streamableVideo } = VideoState;

  useEffect(() => {
    dispatch(getRecipeDetails(id));
  }, [id]);

  useEffect(() => {
    if (videoID) dispatch(getStreamableVideo(videoID));
  }, [videoID]);

  return (
    <>
      {loading ? (
        <div className="new_container">
          <div className="">
            <Skeleton height={500} />
          </div>
        </div>
      ) : (
        <div>
          <RecipesBanner recipeData={recipeDetails} />
          <div className="new_container">
            <div className="">
              <Row
                gutter={[10, 10]}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Col xs={24} sm={24} md={16} lg={16}>
                  <div
                    className="ingredients-main-inm "
                    style={{ width: "90%" }}
                  >
                    <div className="pro-ynit-hding">
                      <div className="product-puq">
                        <h2>Product</h2>
                      </div>
                      {/* <div className="unit-puq">
                        <h2>Unit</h2>
                      </div> */}
                      <div className="quantity-puq">
                        <h2>Product Line</h2>
                      </div>
                    </div>

                    {recipeDetails.ingredient_data &&
                      recipeDetails.ingredient_data.map((item, key) => (
                        <IngredientsRecipes
                          item={item}
                          keyval={key}
                          path="details"
                        />
                      ))}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  {/* <div className="number-servings">
                    <p>Number of servings</p>
                    <b>{parseInt(recipeDetails.serving_size)}</b>
                  </div> */}
                  <div className="nutrition-values-nnv">
                    <h2 className="nutrition-vnnv">Nutrition Values</h2>

                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Calories</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.calorie || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Sodium</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.sodium || "N/A"}
                      </b>
                    </div>

                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Fat</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.trans_fat || "N/A"}
                      </b>
                    </div>

                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Saturated Fat</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.saturated_fat || "N/A"}
                      </b>
                    </div>

                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Carbohydrate</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.carbs || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Sugar</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.sugar | "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Dietary Fiber</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.fibre || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Protein</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.protein || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Cholesterol</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.cholestrol || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Sodium</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.sodium || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Minerals</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.minerals || "N/A"}
                      </b>
                    </div>
                    <div className="energy-nnv">
                      <p className="energy-nnnv-p">Vitamin</p>
                      <b className="energy-nnv-b">
                        {recipeDetails.vitamin || "N/A"}
                      </b>
                    </div>
                    <p className="nutrition-para-npv">
                      {recipeDetails.description}
                    </p>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <CookingInstructions
                    instructionData={recipeDetails.instruction_data}
                  />
                </Col>
                {/* <Col xs={24} sm={24} md={15} lg={15}>
                  <div
                    className="liveplayvideo-lg0"
                    style={{
                      marginTop: "20px",
                      width: "70%",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      height: "200px",
                    }}
                  >
                    <img
                      src={
                        recipeDetails.banner != null
                          ? S3_BUCKET_URL + recipeDetails.banner
                          : imgbanner
                      }
                      alt=""
                    />
                    <PlayCircleOutlined
                      onClick={() => {
                        setVideoId(recipeDetails.id);
                        setModalVisible(true);
                      }}
                      // className="ahul"
                      className="player-video-pvp "
                      style={{ fontSize: "100px" }}
                    />
                  </div>
                </Col> */}
                <Col xs={24} sm={24} md={9} lg={9}></Col>
              </Row>
            </div>
            <Row gutter={[10, 10]}>
              {recipeDetails &&
              recipeDetails.today_recipe &&
              recipeDetails.today_recipe.length > 0 ? (
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="recommended-main-rm">
                    <h2 className="recommended-hding-rm">Today's Recipes</h2>
                    <Row gutter={[10, 10]}>
                      {recipeDetails.today_recipe &&
                        recipeDetails.today_recipe.map((item, index) => (
                          <Col xs={24} sm={24} md={6} lg={6}>
                            <RecipeItemBox
                              data={item.programmable_user}
                              key={index}
                              path={"today_recipe"}
                            />
                          </Col>
                        ))}
                    </Row>
                  </div>
                </Col>
              ) : null}

              <Col xs={24} sm={24} md={24} lg={24}>
                {recipeDetails && recipeDetails.recommended_recipe != 0 ? (
                  <>
                    <div className="recommended-main-rm">
                      <h2 className="recommended-hding-rm">
                        RECOMMENDED RECIPES
                      </h2>
                      <Row gutter={[10, 10]}>
                        {recipeDetails &&
                          recipeDetails.recommended_recipe &&
                          recipeDetails.recommended_recipe.map(
                            (item, index) => (
                              <Col xs={24} sm={24} md={6} lg={6}>
                                <RecipeItemBox
                                  data={item}
                                  key={index}
                                  path={"details"}
                                />
                              </Col>
                            )
                          )}
                      </Row>
                    </div>
                  </>
                ) : null}
              </Col>

              <Modal
                visible={modalVisible}
                footer={null}
                className="corecircuitmodel-ccm"
                onCancel={() => {
                  const pauseData = playerRef.current.pause();
                  console.log("pauseData------------", pauseData);
                  setModalVisible(false);
                }}
              >
                <ReactHlsPlayer
                  playerRef={playerRef}
                  src={streamableVideo.url}
                  autoPlay={true}
                  controls={true}
                  width="100%"
                  height="auto"
                />
              </Modal>
            </Row>
          </div>

          {/* <RegisterNow /> */}
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
