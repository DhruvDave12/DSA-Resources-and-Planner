import React from "react";
import { Tabs } from "antd";
import Login from "../../components/login/login.component";
import Signup from "../../components/signup/signup.component";
import "./auth.styles.css";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const Auth = () => {
    const {handleRegister, handleLogin} = React.useContext(AuthContext);
    const navigate = useNavigate();

    const onFinishSignup = async (values) => {
        const res = await handleRegister(values);
        if(res.success){
            toast("Please login to continue 😁");
        } else {
            console.log("ERROR: ", res)
            toast.error("Error occured while signing you in ☹");
        }
    };

  const onFinishFailedSignup = (errorInfo) => {
    console.log(errorInfo);
  };

  const onFinishLogin = async (values) => {
    const res = await handleLogin(values);
    if(res.success){
        navigate('/dashboard');
    } else {
        console.log("ERROR: ", res)
        toast.error("Error occured while loggin you in ☹");
    }
};

  const onFinishFailedLogin = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div className="auth__page">
        <p style={{fontSize: 30}}>Welcome to DSA Resource Planner 🎉</p>
      <Tabs defaultActiveKey={"1"} style={{ width: '40vw'}} onChange={(val) => console.log("VAL: ", val)}>
        <Tabs.TabPane tab="Signup" key="1">
          <Signup onFinishFailedSignup={onFinishFailedSignup} onFinishSignup={onFinishSignup}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Login" key="2">
          <Login onFinishFailedLogin={onFinishFailedLogin} onFinishLogin={onFinishLogin}/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Auth;
