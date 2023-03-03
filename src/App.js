import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import EventPage from "./Components/EventPage";
import EventForm from "./Components/EventForm";
import {getUser} from "./user";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}>
                </Route>
                <Route path="/register" element={<Register/>}>
                </Route>
                <Route path="/events" element={
                    <PrivateRoute>
                        <EventPage/>
                    </PrivateRoute>
                }>
                </Route>
                <Route path="/events/new" element={
                    <PrivateRoute>
                        <EventForm/>
                    </PrivateRoute>
                }>
                </Route>
                <Route path="/events/:id" element={
                    <PrivateRoute>
                        <EventForm/>
                    </PrivateRoute>
                }>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function PrivateRoute({children}) {
    const user = getUser();
    return user ? children : <Navigate to="/"/>;
}

export default App;