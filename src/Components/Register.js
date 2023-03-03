import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser, validateEmail} from "../user";

export default function Register() {
    const navigate = useNavigate();
    const [params, setParams] = useState({});
    const [errors, setErrors] = useState({});

    const user = getUser();

    useEffect(() => {
        if (user) {
            navigate("/events");
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setParams(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");

        if (name === "email") {
            setError("registered", "");
            setError("invalid_email", "");
        }
    }

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const register = () => {

        const validate = ["name", "email", "password"];
        let errs = {};
        for (let i = 0; i < validate.length; i++) {
            if (!params[validate[i]]) {
                errs = {...errs, [validate[i]]: `${validate[i]} is required`};
            }
        }

        if (params?.email && !validateEmail(params.email)) {
            errs = {...errs, invalid_email: "Invalid Email"};
        }

        setErrors(prev => {
            return {
                ...prev,
                ...errs
            }
        });

        if (!Object.keys(errs).length) {
            save();
        }
    }

    const save = () => {
        const users = [];

        users.push(...JSON.parse(localStorage.getItem("users")) || []);
        let id = users.length ? users[users.length - 1].id + 1 : 1;

        const exist = users.find((u) => u?.email === params.email);
        if (!exist) {
            users.push({...params, id});
            localStorage.setItem("users", JSON.stringify(users));
            setParams({});
            navigate("/");
        } else {
            setError("registered", "Email already Registered");
        }
    }

    return (
        <div className="card">
            <div className="form">
                <div className="title">
                    <p>Register</p>
                </div>
                <div className="space"></div>
                <div>
                    <label>Name<span className="mandatory">*</span></label>
                    <input type="text" name="name" value={params.name || ""} onChange={handleChange}/>
                    {
                        !!errors.name && <span className="mandatory">{errors.name}</span>
                    }
                </div>
                <div className="space"></div>
                <div>
                    <label>Email<span className="mandatory">*</span></label>
                    <input type="text" name="email" value={params.email || ""} onChange={handleChange}/>
                    {
                        !!errors.email && <span className="mandatory">{errors.email}</span>
                    }
                    {
                        !!errors.invalid_email && <span className="mandatory">{errors.invalid_email}</span>
                    }
                    {
                        !!errors.registered && <span className="mandatory">{errors.registered}</span>
                    }
                </div>
                <div className="space"></div>
                <div>
                    <label>Password<span className="mandatory">*</span></label>
                    <input type="password" name="password" value={params.password || ""} onChange={handleChange}/>
                    {
                        !!errors.password && <span className="mandatory">{errors.password}</span>
                    }
                </div>
                <div className="space"></div>
                <div>
                    <button onClick={() => register()}>Register</button>
                </div>
                <div className="space"></div>
                <div>
                    <span>Already registered? <span className="account"
                                                    onClick={() => navigate("/")}>Login</span></span>
                </div>
            </div>
        </div>
    )
}