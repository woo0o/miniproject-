import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* Source */
import { actionCreator as logIn } from "../redux/modules/user";

/* Componenet */
import { Title } from "../components/component";

/* Elements */
import { Btn } from "../elements/element";

const Login = () => {
  const isLogin = useSelector((store) => store.user.is_login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPwd] = useState("");

  const login = (e) => {
    if (username === "" || password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요!");
      return;
    }

    e.preventDefault();
    dispatch(logIn.loginDB(username, password)
    );
    navigate("/");
  };

  return (
    <React.Fragment>
      <Title text={"로그인"} />
      <Form>
        <div className="form-list">
          <label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="아이디를 입력하세요."
            />
          </label>
        </div>
        <div className="form-list">
          <label>
            <input
              onChange={(e) => setPwd(e.target.value)}
              type="password"
              placeholder="비밀번호를 입력하세요."
            />
          </label>
        </div>
      </Form>
      <FormFoot>
        <Btn border _click={login} text={"로그인"} />
      </FormFoot>
    </React.Fragment>
  );
};
const Form = styled.form`
  margin: 4rem auto 0 auto;
  width: 50rem;
  display: flex;
  flex-direction: column;
  .form-list {
    display: flex;
    label {
      flex: 4;
      margin-bottom: 2rem;
      width: 100%;
      input {
        padding: 0 1rem;
        width: 100%;
        height: 4rem;
        border: 1px solid #dddddd;
        border-radius: 0.5rem;
      }
    }
    button {
      flex: 1;
      height: 4rem;
      /* border-left: 0; */
    }
  }
  .form-list + .form-list {
    /* margin-top: 2rem; */
  }
`;

const FormFoot = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    border-radius: 0.5rem;
  }
`;
// const Form = styled.form`
//     margin: 0 auto;
//     width: 20rem;
//     display: flex;
//     flex-direction: column;
//     label{
//         margin-bottom: 3rem;
//         input{
//             padding: 0 1rem;
//             width: 100%;
//             height: 2rem;
//             line-height: 2rem;
//         }
//     }
// `
export default Login;
