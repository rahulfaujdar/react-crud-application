import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../user";

export default function Login() {
    const navigate = useNavigate();
    const [params, setParams] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const {name, value} = e.target;

        setParams(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");
        setError("not_registered", "");
        if (name === "password") {
            setError("incorrect_password", "");
        }
    }

    const user = getUser();

    useEffect(() => {
        if (user) {
            navigate("/events");
        }
    }, []);

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const login = () => {
        const {email, password} = params;

        if (!email) {
            setError("email", "email is required");
        }

        if (!password) {
            setError("password", "password is required");
        }

        if (email && password) {
            const users = [];

            users.push(...JSON.parse(localStorage.getItem("users")) || []);

            const exist = users.find((u) => u?.email === params.email);
            if (exist) {
                if (exist.password !== params.password) {
                    setError("incorrect_password", "Incorrect Password");
                } else {
                    exist.login = true;
                    localStorage.setItem("users", JSON.stringify(users));
                    navigate("/events");
                    setParams({});
                }

            } else {
                setError("not_registered", "User not Registered");
            }
        }
    }

    return (
        <div className="card">
            <div className="form">
                <div className="title">
                    <p>Login</p>
                </div>
                {
                    !!errors.not_registered && <span className="mandatory">{errors.not_registered}</span>
                }
                <div className="space"></div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={params.email || ""} onChange={handleChange}/>
                    {
                        !!errors.email && <span className="mandatory">{errors.email}</span>
                    }
                </div>
                <div className="space"></div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={params.password || ""} onChange={handleChange}/>
                    {
                        !!errors.password && <span className="mandatory">{errors.password}</span>
                    }
                    {
                        !!errors.incorrect_password && <span className="mandatory">{errors.incorrect_password}</span>
                    }
                </div>
                <div className="space"></div>
                <div>
                    <button onClick={() => login()}>Login</button>
                </div>
                <div className="space"></div>
                <div>
                    <span>Not registered? <span className="account" onClick={() => navigate("/register")}>Create an account</span></span>
                </div>
            </div>
        </div>
    )
}