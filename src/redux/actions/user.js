import { UPDATE_AUTH, USER_DETAIL } from "../../config/actionTypes";
import RAW from "../../api/raw";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SUGGESTIC } from "../../config/constants";

export const register = (data, navigate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/register", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data.token);
      //await localStorage.setItem("user_data", response.data.data.token);
      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
          isAuth: true,
        },
      });
      // navigate("/wellness-profile");
      navigate("/my-profile", { state: { path: "firstLogin" } });
      message.success(response.data.message);
    } else {
      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};
// ******************************** start ************************

export const stripeRegister = (data) => async (dispatch, getState) => {
  try {
    
    const response = await axios.post(SUGGESTIC + "user/register", data);
    console.log("payment user create----",response)
    // if (response.data.success) {
    // } 
  } catch (err) {
    console.log("errer on payment ",err)
}
};

// ********************************  end  ************************ 
export const login = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/login", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data.token);

      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const socialLogin = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/social_login", data);
    if (response.data.success) {
      await localStorage.setItem("token", response.data.data.token);

      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
          isAuth: true,
          successMessage: response.data.message,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
          isAuth: false,
          errorMessage: "Error: " + response.data.message,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const tryLocalSignIn = (navigate) => async (dispatch) => {
    // const response = await RAW.get("/get_profile");
    // console.log("respk------",response.data)
  const token = await localStorage.getItem("token");


  if (token) {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: false,
        isAuth: true,
      },
    });
  }

  // try {
  //   dispatch({
  //     type: UPDATE_AUTH,
  //     payload: {
  //       loading: true,
  //       // isAuth: false
  //     },
  //   });

  //   const response = await RAW.get("/get_profile");

  //   if (token && response.status != "Request failed with status code 401") {
  //     console.log("run---3");
  //     return dispatch({
  //       type: UPDATE_AUTH,
  //       payload: {
  //         loading: false,
  //         isAuth: true,
  //       },
  //     });
  //   } else {
  //     await localStorage.removeItem("token");
  //     console.log("run---4");
  //     dispatch({
  //       type: UPDATE_AUTH,
  //       payload: {
  //         loading: false,
  //         // isAuth: false
  //       },
  //     });
      
  //     navigate("/login");
  //   }
  // } catch (err) {
  //   dispatch({
  //     type: UPDATE_AUTH,
  //     payload: {
  //       loading: false,
  //       // isAuth: false
  //     },
  //   });
  //   await localStorage.removeItem("token");
  // }
};

export const logout = () => async (dispatch) => {
  await localStorage.removeItem("token");
  dispatch({
    type: UPDATE_AUTH,
    payload: {
      isAuth: false,
      userDetail: {},
      notifications: [],
      successMessage: "",
      errorMessage: "",
    },
  });
  message.success("You have successfully Logged out!");
};

export const forgetPassword = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/forgot-password", data);
    if (response.data.success) {
      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
        },
      });
      message.success(response.data.message);
    } else {
      dispatch({
        type: UPDATE_AUTH,
        payload: {
          loading: false,
        },
      });
      message.error(response.data.message);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_AUTH,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
    message.error("Error: " + err);
  }
};

export const userDetailData =
  (navigate, data) => async (dispatch, getState) => {
    try {
      const user = await getState().user;

      
        dispatch({
          type: USER_DETAIL,
          payload: {
            loading: true,
          },
        });

        const response = await RAW.get("/get_profile", { params: data });

        if (response.data.success && response.status != "Request failed with status code 401") {
          
          dispatch({
            type: USER_DETAIL,
            payload: {
              loading: false,
              loadedFlag: true,
              isAuth: true,
              userDetails: response.data.data,
              successMessage: response.data.message,
            },
          });
        } else {
          dispatch({
            type: USER_DETAIL,
            payload: {
              loading: false,
              isAuth: false,
              userDetails: {},
              errorMessage: "Error: " + response.data.message,
            },
          });
        }
      
    } catch (err) {
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: false,
          isAuth: false,
          userDetails: {},
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const userDetailUpdate =
  (data, path, navigate) => async (dispatch, getState) => {
    try {
      const user = await getState().user;

      if (user.isAuth) {
        dispatch({
          type: USER_DETAIL,
          payload: {
            loading: true,
          },
        });

        const response = await RAW.post("/update_profile", data);

        if (response.data.success) {
          dispatch({
            type: USER_DETAIL,
            payload: {
              loading: false,
              loadedFlag: true,
              userDetails: response.data.data,
              successMessage: response.data.message,
            },
          });
          if (path == "firstLogin")
            navigate("/nutrition-calculator", {
              state: { path: "firstLogin" },
            });
          message.success(response.data.message);
        } else {
          message.error(response.data.message);
          dispatch({
            type: USER_DETAIL,
            payload: {
              loading: false,
              errorMessage: "Error: " + response.data.message,
            },
          });
        }
      } else {
        return dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            errorMessage: "Please login !",
          },
        });
      }
    } catch (err) {
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: false,
          errorMessage: "Error: " + err,
        },
      });
    }
  };

export const updateProfilePicture = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;
    if (user.isAuth) {
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: true,
        },
      });

      const response = await RAW.post("/update_profile_pic", data);

      if (response.data.success) {
        dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            loadedFlag: true,
            userDetails: response.data.data,
            successMessage: response.data.message,
          },
        });

        message.success(response.data.message);
      } else {
        message.error(response.data.message);
        dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: USER_DETAIL,
        payload: {
          loading: false,
          errorMessage: "Please login !",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: USER_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const removeProfilePicture = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;

    if (user.isAuth) {
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: true,
        },
      });

      const response = await RAW.post("/remove_profile_pic", data);

      if (response.data.success) {
        dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            loadedFlag: true,
            userDetails: response.data.data,
            successMessage: response.data.message,
          },
        });

        message.success(response.data.message);
      } else {
        message.error(response.data.message);
        dispatch({
          type: USER_DETAIL,
          payload: {
            loading: false,
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: USER_DETAIL,
        payload: {
          loading: false,
          errorMessage: "Please login !",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: USER_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const upgradeSubscriptionPlans = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL,
      payload: {
        loading: true,
      },
    });
    const response = await RAW.post("/update_subscription", {
      subscription: id,
    });
    if (response.data.success) {
      message.success(response.data.message);
      dispatch({
        type: USER_DETAIL,
        payload: {
          userDetails: response.data.data,
          loading: false,
        },
      });
    } else {
      message.error(response.data.message);
      dispatch({
        type: USER_DETAIL,
        payload: {
          loading: false,
          errorMessage: response.data.message,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: USER_DETAIL,
      payload: {
        loading: false,
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const ChangeRecipe = (data) => async (dispatch, getState) => {
  try {
    const user = await getState().user;

    if (user.isAuth) {
      // dispatch({
      //   type: USER_DETAIL,
      //   payload: {
      //     // loading: true,
      //   },
      // });
      const response = await axios.post(SUGGESTIC + "swaprecipe", data);

      console.log("user_id", response.data.data);

      if (response.data.message) {
        dispatch({
          type: USER_DETAIL,
          payload: {
            // loading: false,
            // loadedFlag: true,
            changeRecipe: response.data.data,
            successMessage: response.data.message,
          },
        });
      } else {
        dispatch({
          type: USER_DETAIL,
          payload: {
            // loading: false,
            changeRecipe: [],
            errorMessage: "Error: " + response.data.message,
          },
        });
      }
    } else {
      return dispatch({
        type: USER_DETAIL,
        payload: {
          // loading: false,
          changeRecipe: [],
          errorMessage: "Please login !",
        },
      });
    }
  } catch (err) {
    dispatch({
      type: USER_DETAIL,
      payload: {
        // loading: false,
        changeRecipe: [],
        errorMessage: "Error: " + err,
      },
    });
  }
};

export const ChangeRecipeStore = (data) => async (dispatch, getState) => {
  try {
    console.log("user_id--1", data);
    const response = await RAW.post("/recipe_replace", data);

    console.log("user_id--2", response.data.data);
  } catch (err) {
    console.log(err);
  }
};
