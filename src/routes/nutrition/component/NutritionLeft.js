import React from "react";
import { Slider, Radio, Space } from "antd";

const NutritionLeft = () => {
  return (
    <div className="filterleft">
      <h3 className="filtersheading_fl">Filters</h3>
      <div className="durationrage_fl">
        <h6>Duration</h6>
        <p>0 - 100m</p>
      </div>
      <div className="range-fl">
        <Slider defaultValue={30} />
      </div>
      <div className="filterradio-fl">
        <h3 className="filtersheading_fl">Meals</h3>

        <Radio.Group defaultValue={1}>
          <Space direction="vertical">
            <Radio value={1}>Breakfast</Radio>
            <Radio value={2}>Lunch</Radio>
            <Radio value={3}>Snack </Radio>
            <Radio value={4}> Dinner</Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="filterradio-fl">
        <h3 className="filtersheading_fl">Categories</h3>

        <Radio.Group defaultValue={1}>
          <Space direction="vertical">
            <Radio value={1}>Gluten Free</Radio>
            <Radio value={2}>High in Fiber </Radio>
            <Radio value={3}>High in Protein </Radio>
            <Radio value={4}>No Dairy </Radio>
            <Radio value={5}>Vegan</Radio>
            <Radio value={6}>Vegetarian</Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="filterradio-fl">
        <h3 className="filtersheading_fl">Main Ingredient</h3>

        <Radio.Group name="radiogroup" defaultValue={1}>
          <Space direction="vertical">
            <Radio value={1}>Beef</Radio>
            <Radio value={2}>Dairy </Radio>
            <Radio value={3}>Egg</Radio>
            <Radio value={4}>Fish </Radio>
            <Radio value={5}>Fruit</Radio>
            <Radio value={6}>Grain</Radio>
            <Radio value={7}>Legume</Radio>
            <Radio value={8}>Pasta </Radio>
            <Radio value={9}>Pork </Radio>
            <Radio value={10}>Poultry</Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

export default NutritionLeft;
