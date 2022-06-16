import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie.js";

import { api, Axios } from "../../Axios";
import { useNavigate } from "react-router-dom";


// 액션 타입

const LOG_IN = "user/LOG_IN";
const LOG_OUT = "user/LOG_OUT";
const GET_USER = "user/GET_USER";

// 액션 생성 함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// 초기값
const initialState = {
  user: null,
  is_login: false,
};

// 미들웨어
const loginDB = (username, password) => {
  return function (dispatch, getstate) {
    Axios
      .login(username, password)
      .then((res) => {
        console.log(res);
        setCookie("token", res.data.token, user);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("is_login", true);
        dispatch(logIn({ username: username }));
      })
      .catch((err) => {
        window.alert("없는 회원정보 입니다. 회원가입을 해주세요.");
      });
  };
};

const signupDB = (username, nickname, password) => {
  return function (dispatch, getstate) {
    Axios
      .signup(username, nickname, password) //
      .then((response) => {
        console.log(response);
        window.alert("회원가입을 축하합니다!");
      })
      .catch((err) => {
        window.alert("이미 존재하는 아이디입니다.");
      });
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState) {
    const username = localStorage.getItem("username");
    const tokenCheck = document.cookie;
    if (tokenCheck) {
      dispatch(logIn({ username: username }));
    } else {
      dispatch(logOut());
    }
  };
};

const logoutDB = () => {
  return function (dispatch, getState) {
    deleteCookie("token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_login");
    dispatch(logOut());
  };
};

// 리듀서
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),
  },
  initialState
);

// 내보내기위해 합치기
const actionCreator = {
  logIn,
  logOut,
  getUser,
  loginDB,
  logoutDB,
  signupDB,
  loginCheckDB,
};

export { actionCreator };