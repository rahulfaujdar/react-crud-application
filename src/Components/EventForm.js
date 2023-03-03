import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Profile from "./Profile";

export default function EventForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (params.id) {
            const events = JSON.parse(localStorage.getItem("events"));
            if (events && events.length) {
                const ev = events.find(e => e.id === Number(params.id));
                if (ev) {
                    setEvent(ev);
                } else {
                    navigate("/events");
                }
            }
        }
    }, []);

    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === "price") {
            value = value.replace(/\D/g, "");
        }
        setEvent(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");
    }

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const cancel = () => {
        setEvent({});
        setErrors({});
        navigate("/events");
    }

    const create = () => {

        const validate = ["name", "description", "price", "date", "type"];
        let errs = {};
        for (let i = 0; i < validate.length; i++) {
            if (!event[validate[i]]) {
                errs = {...errs, [validate[i]]: `${validate[i]} is required`};
            }
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
        const data = [];
        const user = {id: 1};
        const old = JSON.parse(localStorage.getItem("events"));
        let id = 1;
        if (old) {
            data.push(...old);
            id = old.length ? old[old.length - 1].id + 1 : 1;
        }

        if (event?.id) {
            const oldEvent = data.find(o => o.id === event.id);
            for (const a in oldEvent) {
                oldEvent[a] = event[a];
            }
        } else {
            data.push({id, userId: user.id, ...event});
        }

        localStorage.setItem("events", JSON.stringify(data));
        cancel();
    }

    return (
        <div>
            <Profile children={
                <button style={{width: "80px"}} onClick={() => navigate("/events")}>Events</button>
            }/>
            <div className="card">
                <div className="form">
                    <div className="title">
                        <p>{event.id ? "Update" : "Create"} Event</p>
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Name<span className="mandatory">*</span></label>
                        <input type="text" name="name" value={event.name || ""} onChange={handleChange}/>
                        {
                            !!errors.name && <span className="mandatory">{errors.name}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Description<span className="mandatory">*</span></label>
                        <textarea style={{width: "100%"}} rows="4" name="description" value={event.description || ""}
                                  onChange={handleChange}></textarea>
                        {
                            !!errors.description && <span className="mandatory">{errors.description}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{width: "45%"}}>
                            <label>Price<span className="mandatory">*</span></label>
                            <input type="text" name="price" value={event.price || ""} onChange={handleChange}/>
                            {
                                !!errors.price && <span className="mandatory">{errors.price}</span>
                            }
                        </div>
                        <div style={{width: "45%"}}>
                            <label>Date<span className="mandatory">*</span></label>
                            <input type="date" name="date" value={event.date || ""} onChange={handleChange}/>
                            {
                                !!errors.date && <span className="mandatory">{errors.date}</span>
                            }
                        </div>
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Type<span className="mandatory">*</span></label>
                        <div className="space"></div>
                        <div className="radio" style={{display: "flex"}}>
                            <div>
                                <label>
                                    <input type="radio" name="type" value="Normal" checked={event.type === "Normal"}
                                           onChange={handleChange}/>
                                    &nbsp;Normal</label>
                            </div>
                            <div style={{marginLeft: "10px"}}>
                                <label>
                                    <input type="radio" name="type" value="Premium" checked={event.type === "Premium"}
                                           onChange={handleChange}/>
                                    &nbsp;Premium</label>
                            </div>
                        </div>
                        {
                            !!errors.type && <span className="mandatory">{errors.type}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div>
                        <button onClick={() => cancel()}>Cancel</button>
                        <button style={{marginLeft: "5px"}}
                                onClick={() => create()}>{event.id ? "Update" : "Create"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}