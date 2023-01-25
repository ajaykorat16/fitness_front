import {
  MANAGE_RECIPES,
  MARK_RECIPE_FAVOURITE,
  RECOMMENDED_RECIPE,
  FAV_TODAY_RECIPE
} from "../../config/actionTypes";

const INITIAL_STATE = {
  loading: false,
  recipeVideos: [],
  recipePaginationObj: {},
  recipeCategories: [],
  recipeIngredients: [],
  recipeMeals: [],
  recipeDetails: {},
  selectedOverview: {},
  successMessage: "",
  errorMessage: "",
};

const Recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MANAGE_RECIPES:
      return { ...state, ...action.payload };
    case RECOMMENDED_RECIPE:
      return {
        ...state,
        recipeDetails:{
          ...state.recipeDetails,
          recommended_recipe : state.recipeDetails.recommended_recipe.map((item) =>
          item.id === action.payload.recipe_id
            ? { ...item, is_favorite_count: action.payload.flag }
            : item
        ),
        } 
      };
    case MARK_RECIPE_FAVOURITE:
      return {
        ...state,
        recipeVideos: state.recipeVideos.map((item) =>
          item.id === action.payload.recipe_id
            ? { ...item, is_favorite_count: action.payload.flag }
            : item
        ),
      };

      case FAV_TODAY_RECIPE:
        return {
          ...state,
          recipeDetails:{
            ...state.recipeDetails,
            today_recipe : state.recipeDetails.today_recipe.map((item) =>
            item.programmable_user.id === action.payload.recipe_id
              ? { ...item, programmable_user :{ ...item.programmable_user ,is_favorite : action.payload.flag } }
              : item
          ),
          } 
        };
    default:
      return state;
  }
};

export default Recipes;
