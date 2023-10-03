import React, { Fragment, useRef, useState, useEffect } from "react";
import "./login.css";

import { Link, redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login,register } from "../../actions/userAction";
import Loading from "../../components/Loading/Loading";
import { useNavigate} from "react-router-dom";


const LoginSignUp = ({ history}) => {

    const dispatch = useDispatch();
    //history = createHashHistory();
    const navigate = useNavigate();

    const { error, isAuthenticated, loading } = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    const loginSubmit = (e) => {
        console.log("form submitted");
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    useEffect(()=>{
        if (error){
            dispatch(clearErrors());
        }
        console.log("Reached Above",isAuthenticated)
        if (isAuthenticated){
            console.log("Reached Here")
            navigate('/account');
        }
       },[dispatch,error,isAuthenticated]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    return (
        <Fragment>
            {loading ? (<Loading />) :
                (
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <i className="fa-regular fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <i className="fa-solid fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />

                                </div>
                                <Link to="/password/forget">Forgot Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}>
                                <div className="signUpName">
                                    <i className="fa-regular fa-user"></i>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />

                                </div>
                                <div className="signUpEmail">
                                    <i className="fa-regular fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />

                                </div>
                                <div className="signUpPassword">
                                    <i className="fa-solid fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />

                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>

                        </div>
                    </div>
                )
            }
        </Fragment>)

}


export default LoginSignUp;