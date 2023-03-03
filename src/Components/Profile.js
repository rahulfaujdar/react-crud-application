import React from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../user";

export default function Profile({children}) {
    const navigate = useNavigate();
    const user = getUser();
    const logOut = () => {
        const users = [];

        users.push(...JSON.parse(localStorage.getItem("users")) || []);

        const user = users.find((u) => u.login);
        if (user) {
            user.login = undefined;
            localStorage.setItem("users", JSON.stringify(users));
            navigate("/");
        }
    }
    return (
        <div style={{margin: "50px 100px", display: "flex", justifyContent: "end"}}>
            <div style={{textAlign: "center"}}>
                <p>Profile</p>
                <p style={{fontSize: "20px"}}>{user.name}</p>
                <div style={{marginTop: "10px"}}>
                    {children}
                    <span>&nbsp;</span>
                    <button onClick={() => logOut()}>Logout</button>
                </div>
            </div>
        </div>
    )
}