import { gql } from "@apollo/client";

const CUSTOM_MEAL_PLAN = gql`
  query customMealPlan(
    $calories: Int!
    $carbs: Float
    $protein: Float
    $fat: Float
    $days: Int
    $format: [MealTime]!
    $breakfastDistribution: Float
  ) {
    customMealPlan(
      calories: $calories
      carbs: $carbs
      protein: $protein
      fat: $fat
      days: $days
      format: $format
      breakfastDistribution: $breakfastDistribution
    ) {
      day
      calories
      meals {
        id
        meal
        numOfServings
        calories
        recipe {
          name
          numberOfServings
          nutrientsPerServing {
            calories
          }
        }
      }
    }
  }
`;

export default CUSTOM_MEAL_PLAN;
