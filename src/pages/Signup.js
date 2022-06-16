import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { emailCheck } from "../shared/emailvalidate";
import { useNavigate } from "react-router-dom";

/* Source */
import { actionCreator as signupAction } from "../redux/modules/user";

/* Componenet */
import { Title } from "../components/component";

/* Elements */
import { Btn } from "../elements/element";


const Signup = () => {
  const isLogin = useSelector((store) => store.user.is_login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCk, setPasswordCk] = useState("");


  const signup = () => {
    if (username === "" || password === "" || passwordCk === "" || nickname === "") { // 
      window.alert("모두 입력해주세요!");
      return;
    }
    if (password !== passwordCk) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!");
      return;
    }
    dispatch(
      signupAction.signupDB(username, nickname, password) //
    );
    navigate("/login");
  }

  return (
    <React.Fragment>
      <Title text={"회원가입"} />
      <Form>
        <div className="form-list">
          <label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="이메일을 입력해주세요"
              className="with-btn"
            />
          </label>
        </div>
        <div className="form-list">
          <label>
            <input
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className="with-btn"
            />
          </label>
        </div>
        <div className="form-list">
          <label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </label>
        </div>
        <div className="form-list">
          <label>
            <input
              type="password"
              onChange={(e) => setPasswordCk(e.target.value)}
              placeholder="비밀번호를 재입력해주세요"
            />
          </label>
        </div>
      </Form>
      <FormFoot>
        <Btn border _click={() => signup()} text={"회원가입하기"} />
      </FormFoot>
    </React.Fragment>
  );
};
const Form = styled.div`
  margin: 4rem auto 0 auto;
  width: 50rem;
  display: flex;
  flex-direction: column;
  .form-list {
    display: flex;
    label {
      flex: 4;
      margin-bottom: 3rem;
      width: 100%;
      input {
        padding: 0 1rem;
        width: 100%;
        height: 4rem;
        border: 1px solid #dddddd;
        border-radius: 5px;
        &.with-btn {
          border-radius: 5px 0 0 5px;
        }
      }
    }
    button {
      flex: 1;
      height: 4rem;
      border-left: 0;
      font-size: 1.5rem;
      border-radius: 0 5px 5px 0;
    }
  }
  .form-list + .form-list {
    margin-top: 1rem;
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
export default Signup;
