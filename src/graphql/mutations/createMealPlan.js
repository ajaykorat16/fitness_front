import { gql } from "@apollo/client";

const GENERATE_MEAL_PLAN = gql`
  mutation {
    generateMealPlan(
      breakfastDistribution: 0.3
      dinnerDistribution: 0.25
      addDays: 30
      kcalLimit: 200
    ) {
      success
      message
    }
  }
`;

export default GENERATE_MEAL_PLAN;
