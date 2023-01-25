import React, { useEffect, useState } from "react";
import { Slider, Space, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes } from "../redux/actions/recipesAction";
import { useLocation, useNavigate } from "react-router-dom";

const RecipeFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var params = new URLSearchParams(useLocation().search);
  const query = paramsToObject(params.entries());

  const [duration, setDuration] = useState(query.duration || 100);

  const recipesState = useSelector((state) => state.recipes);
  const { recipeCategories, recipeIngredients, recipeMeals } = recipesState;

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      result[key] = value;
    }
    return result;
  }

  useEffect(() => {
    dispatch(filterRecipes({ type: "R" }));
  }, []);

  function onChangeFilter(e) {
    if (e.target.filter_key in query) {
      var myArr = query[e.target.filter_key].split(",").map(Number);
      var index = myArr.indexOf(e.target.value);
      if (index !== -1) {
        myArr.splice(index, 1);
        query[e.target.filter_key] = myArr.join();
        if (myArr.length === 0) delete query[e.target.filter_key];
      } else {
        query[e.target.filter_key] =
          query[e.target.filter_key] + "," + e.target.value;
      }
      navigate("/recipes?" + new URLSearchParams(query).toString());
    } else {
      query[e.target.filter_key] = String(e.target.value);
      navigate("/recipes?" + new URLSearchParams(query).toString());
    }
  }

  function onChangeDateRange(e) {
    setDuration(e);
    query.duration = String(e);
    navigate("/recipes?" + new URLSearchParams(query).toString());
  }

  return (
    <div className="filterleft  filter-bg-fg">
      <div className="sticky-top">
        <h3 className="filtersheading_fl">Filters</h3>
        <div className="durationrage_fl">
          <h6
            style={{
              color: "#fff",
            }}
          >
            Duration
          </h6>
          {/* <p>0 - 100m</p> */}
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              float: "left",
              color: "#29B8C4",
              fontSize: "16px",
            }}
          >
            15
          </p>
          <p
            style={{
              float: "right",
              color: "#29B8C4",
              fontSize: "16px",
            }}
          >
            40
          </p>
        </div>
        <div className="range-fl">
          <Slider
            defaultValue={duration}
            step={1}
            max={100}
            onAfterChange={onChangeDateRange}
          />
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_fl">Meals</h3>

          <Space direction="vertical">
            {recipeMeals.map((item, i) => {
              var myArr = [];
              if ("meal" in query) {
                myArr = query.meal.split(",").map(Number);
              }
              return (
                <Checkbox
                  key={i}
                  value={item.id}
                  checked={myArr.includes(item.id) ? true : false}
                  onChange={onChangeFilter}
                  filter_key="meal"
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Space>
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_fl">Categories</h3>

          <Space direction="vertical">
            {recipeCategories.map((item, i) => {
              var myArr = [];
              if ("categories" in query) {
                myArr = query.categories.split(",").map(Number);
              }
              if (i < 10) {
                return (
                  <Checkbox
                    key={i}
                    value={item.id}
                    checked={myArr.includes(item.id) ? true : false}
                    onChange={onChangeFilter}
                    filter_key="categories"
                  >
                    {item.name}
                  </Checkbox>
                );
              }
            })}
            <Checkbox
              key={"isFavorites"}
              value={1}
              checked={Boolean(query.isFavorites) ? true : false}
              onChange={onChangeFilter}
              filter_key="isFavorites"
            >
              Favorites
            </Checkbox>
          </Space>
        </div>
        <div className="filterradio-fl">
          <h3 className="filtersheading_fl">Main Ingredient</h3>

          <Space direction="vertical">
            {recipeIngredients.map((item, i) => {
              var myArr = [];
              if ("ingredients" in query) {
                myArr = query.ingredients.split(",").map(Number);
              }
              if (i < 10) {
                return (
                  <Checkbox
                    key={i}
                    value={item.id}
                    checked={myArr.includes(item.id) ? true : false}
                    onChange={onChangeFilter}
                    filter_key="ingredients"
                  >
                    {item.name}
                  </Checkbox>
                );
              }
            })}
          </Space>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
            }}
          >
            {/* <button
              style={{
                backgorund: "#ffff",
                padding: "8px 25px 8px 25px",
                marginRight: "10px",
                color: "#29B8C4",
                backgroundColor: "#000",
                // border: "#29B8C4",
                borderColor: "#29B8C4",
              }}
            >
              CLEAR
            </button>
            <button
              style={{
                backgorund: "#ffff",
                padding: "8px 25px 8px 25px",
              }}
            >
              FILTER
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilter;
