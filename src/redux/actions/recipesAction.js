import {
  MANAGE_RECIPES,
  MARK_RECIPE_FAVOURITE,
  RECOMMENDED_RECIPE,
  FAV_TODAY_RECIPE
} from "../../config/actionTypes";
import RAW from "../../api/raw";
import { message } from "antd";

export const getRecipes = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/search_recipe", { params: data });
    if (response.data.success) {
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          recipeVideos: response.data.data.data,
          recipePaginationObj: response.data.data,
          successMessage: response.data.message,
          loading: false,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeVideos: [],
          recipePaginationObj: {},
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        recipeVideos: [],
        errorMessage: "Error" + err,
      },
    });
  }
};

export const searchRecipes = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get(`/search_recipe?query_val=${data}`);

    if (response.data.success) {
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeVideos: response.data.data.data,
          recipePaginationObj: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeVideos: [],
          recipePaginationObj: {},
          successMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const filterRecipes = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get("/get_filter", { params: data });
    if (response.data.success) {
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeCategories: response.data.data.categories,
          recipeIngredients: response.data.data.ingredient,
          recipeMeals: response.data.data.meal,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeCategories: [],
          recipeIngredients: [],
          recipeMeals: [],
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        recipeCategories: [],
        recipeIngredients: [],
        recipeMeals: [],
        errorMessage: "Error" + err,
      },
    });
  }
};

export const addManualRecipes = (data) => async (dispatch, getState) => {
  console.log(data);
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post(`/add_manual_recipe `, data);
    if (response.data.success) {
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeVideos: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeVideos: [],
          successMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const getRecipeDetails = (recipe_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.get(`/get_recipe/${recipe_id}`);
    if (response.data.success) {
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeDetails: response.data.data,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          recipeDetails: {},
          successMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const addToFavouriteRecipe =
  (recipe_id) => async (dispatch, getState) => {
    try {
      const response = await RAW.post(`/add_favorite_recipe`, {
        id: recipe_id,
      });
      if (response.data.success) {
        dispatch({
          type: MARK_RECIPE_FAVOURITE,
          payload: {
            recipe_id: recipe_id,
            flag: response.data.data,
          },
        });
      } else
        dispatch({
          type: MANAGE_RECIPES,
          payload: {
            errorMessage: response.data.message,
          },
        });
    } catch (err) {
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          errorMessage: "Error" + err,
        },
      });
    }
  };

export const getRecipeOverviewModalData = (recipe_id,eventId) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    var response = await RAW.get(`/get_recipe_model/${recipe_id}/${eventId}`);
    if (response.data.success) {
      var newData = {};
      
      if(response.data.data.recipe_progress){
        response.data.data.recipe_progress["calories"] = response.data.data.calorie ? response.data.data.calorie : null
        response.data.data.recipe_progress["carbs"] = response.data.data.carbs
        response.data.data.recipe_progress["protein"] = response.data.data.protein
        response.data.data.recipe_progress["fat"] = response.data.data.trans_fat

      }else{
        newData["calories"] = response.data.data.calorie
        newData["carbs"] = response.data.data.carbs
        newData["protein"] = response.data.data.protein
        newData["fat"] = response.data.data.trans_fat
        newData["feeling"] = response.data.data.feeling
        
        newData["calorie_progress"] = response.data.data.calorie_progress
        newData["carbs_progress"] = response.data.data.carbs_progress
        newData["fat_progress"] = response.data.data.fat_progress
        newData["protein_progress"] = response.data.data.protein_progress
        newData["fat_progress"] = response.data.data.fat_progress
        newData["recipe_progress"] = response.data.data.recipe_progress
      } 

      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          selectedOverview: response.data.data.recipe_progress ? response.data.data.recipe_progress : newData,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};

export const updateRecipeProgress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post(`/update_manual_recipe `, data);
    if (response.data.success) {
      if(response.data.data.recipe_progress){
        response.data.data.recipe_progress["calories"] = response.data.data.calorie ? response.data.data.calorie : null
        response.data.data.recipe_progress["carbs"] = response.data.data.carbs
        response.data.data.recipe_progress["protein"] = response.data.data.protein
        response.data.data.recipe_progress["fat"] = response.data.data.trans_fat

      }
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          selectedOverview: response.data.data.recipe_progress,
          successMessage: response.data.message,
        },
      });
    } else
      dispatch({
        type: MANAGE_RECIPES,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
  } catch (err) {
    dispatch({
      type: MANAGE_RECIPES,
      payload: {
        loading: false,
        errorMessage: "Error" + err,
      },
    });
  }
};


export const recommendedRecipe =
  (recipe_id) => async (dispatch, getState) => {
    try {
      const response = await RAW.post(`/add_favorite_recipe`, {
        id: recipe_id,
      });
      if (response.data.success) {
        dispatch({
          type: RECOMMENDED_RECIPE,
          payload: {
            recipe_id: recipe_id,
            flag: response.data.data,
          },
        });
      } 
    } catch (err) {
     console.log("error-------fav",err)
    }
  };

  export const favTodayRecipe =
  (recipe_id) => async (dispatch, getState) => {
    try {
      console.log("/add_favorite_recipe today's recipe------------------")
      const response = await RAW.post(`/add_favorite_recipe`, {
        id: recipe_id,
      });
      if (response.data.success) {
        dispatch({
          type: FAV_TODAY_RECIPE,
          payload: {
            recipe_id: recipe_id,
            flag: response.data.data,
          },
        });
      } 
    } catch (err) {
     console.log("error-------fav",err)
    }
  };

  export const RecipeComplete =
  (recipe_id, product_id) => async (dispatch, getState) => {
    try {
      const response = await RAW.post(`/recipe_eaten/${recipe_id}/${product_id}`);     
    } catch (err) {
     console.log("error-------fav",err)
    }
  };

  export const DeleteRecipe =
  ({recipe_id, program_id}) => async (dispatch, getState) => {
    try {
      const response = await RAW.post(`/recipe_delete/${recipe_id}/${program_id}`);  
      message.success("recipe is deleted");  
    } catch (err) {
      message.error("recipe delete is failed");

     console.log("error-------fav",err)
    }
  };