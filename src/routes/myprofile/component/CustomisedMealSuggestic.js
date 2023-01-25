import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Button } from "antd";
import CUSTOM_MEAL_PLAN from "../../../graphql/queries/customMealPlan";

function CustomisedMealSuggestic({ nutritionData }) {
  const [getCustomMealPlan, { loading, error, data }] = useLazyQuery(
    CUSTOM_MEAL_PLAN,
    {
      variables: {
        calories: Boolean(parseInt(nutritionData.calories))
          ? parseInt(nutritionData.calories)
          : 2000,
        carbs: Boolean(parseFloat(nutritionData.carb))
          ? parseFloat(nutritionData.carb / 100)
          : 0.45,
        protein: Boolean(parseFloat(nutritionData.protein))
          ? parseFloat(nutritionData.protein / 100)
          : 0.25,
        fat: Boolean(parseFloat(nutritionData.fat))
          ? parseFloat(nutritionData.fat / 100)
          : 0.3,
        days: 10,
        format: ["BREAKFAST", "LUNCH", "DINNER"],
        breakfastDistribution: 0.3,
      },
    }
  );
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (data && data.customMealPlan) {
    console.log(data.customMealPlan);
    return <p>{JSON.stringify(data.customMealPlan)}</p>;
  }
  return (
    <div>
      <Button onClick={() => getCustomMealPlan()}>
        Get Customised Meal for you
      </Button>
    </div>
  );
}

export default CustomisedMealSuggestic;
