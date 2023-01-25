import React, { useState } from "react";
import { Row, Col, Input, Pagination } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getRecipes, searchRecipes } from "../../redux/actions/recipesAction";
import { useEffect } from "react";
import RecipeFilter from "../../components/RecipeFilter";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import RecipeItemBox from "../../components/RecipeItemBox";
import fork from "../../img/fork.png";
import { CardSkeleton } from "../fitness/component/CardSkeleton";
const Recipes = () => {
  var params = new URLSearchParams(useLocation().search);
  const parsedQuery = paramsToObject(params.entries());

  const [load, setLoad] = useState(true);
  const [pageload, setPageLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Search } = Input;
  const recipesData = useSelector((state) => state.recipes);
  const { recipeVideos, recipePaginationObj, loading } = recipesData;
  var query = queryString.parse(useLocation().search);

  useEffect(() => {
    dispatch(getRecipes(query));
  }, [useLocation().search]);

  const startSearching = (value) => dispatch(searchRecipes(value));

  const paginateRecipe = (page) => {
    parsedQuery.page = String(page);
    navigate("/recipes?" + new URLSearchParams(parsedQuery).toString());
  };

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }

  useEffect(() => {
    loading == false && recipeVideos.length > 0
      ? setLoad(true)
      : setLoad(false);

    if (loading == false) {
      setTimeout(() => {
        setPageLoad(true);
      }, 3000);
    }
  }, [loading]);

  return (
    <div className="side_container">
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <RecipeFilter />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18}>
          <div className="rp-right-profile">
            <div className="searchbar_f">
              <Search
                placeholder="Search"
                onChange={(e) => startSearching(e.target.value)}
                onSearch={startSearching}
              />
            </div>
            <div className="livesessions-f">
              <h2>RECIPES</h2>
            </div>

            <Row gutter={[20, 20]}>
              {loading ? (
                <CardSkeleton />
              ) : recipeVideos && recipeVideos.length > 0 ? (
                recipeVideos &&
                recipeVideos.map((data, index) => (
                  <>
                    <Col xs={24} sm={24} md={8} lg={8}>
                      <RecipeItemBox
                        data={data}
                        key={index}
                        path={"recipeDetails"}
                      />
                    </Col>
                  </>
                ))
              ) : load ? (
                <div className="notfound-nf">
                  <img className="fork-icon" src={fork}></img>
                  <h1>
                    Recipes <b>not found! </b>
                  </h1>
                </div>
              ) : null}
            </Row>
            {loading ? null : (
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {pageload &&
                  recipePaginationObj &&
                  recipePaginationObj.last_page_url !== null ? (
                    <Pagination
                      // size="small"
                      style={{ minHeight: 100, marginTop: 30 }}
                      showSizeChanger={false}
                      defaultCurrent={1}
                      pageSize={recipePaginationObj.per_page || 12}
                      current={recipePaginationObj.current_page}
                      total={recipePaginationObj.total}
                      onChange={paginateRecipe}
                    />
                  ) : null}
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Recipes;
