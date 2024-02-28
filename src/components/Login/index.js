import { Input, Button } from "ms-custom-react-components-library";
import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeamName, setTeamName } from "../../store/globalStore";

function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [teamNameLocal, setTeamNameLocal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onFinish(values) {
        if (teamNameLocal === "Admin") navigate("/leaderboard");
        else {
            sessionStorage.setItem("teamName", teamNameLocal);
            console.log(teamNameLocal);
            dispatch(setTeamName(teamNameLocal));
            setIsLoading(true);
            navigate("/home");
        }
    }

    const onBlurTeamNameLocal = (e) => {
        if (e) {
            setTeamNameLocal(e);
            console.log(e);
        }
    };
    return (
        <div>
            {isLoading ? (
                ""
            ) : (
                <div
                    className="content"
                    // style={{
                    //     height: "calc(100vh - 64px)",
                    //     overflowY: "auto",
                    // }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "35vh",
                            paddingInline: "5rem",
                        }}
                    >
                        <div>
                            <p>Enter your team name to get started!</p>
                            <div style={{ margin: "1rem 0" }}>
                                <Input
                                    placeholder="Enter Team Name"
                                    defaultValue={teamNameLocal}
                                    onChange={(e) => {
                                        onBlurTeamNameLocal(e.target.value);
                                    }}
                                    onPressEnter={onFinish}
                                    style={{ fontSize: "25px" }}
                                />
                            </div>
                            <Button primary onClick={onFinish} small>
                                Start
                            </Button>
                        </div>
                    </div>
                    <div
                        style={{
                            maxWidth: "40rem",
                            margin: "auto",
                            padding: "2rem",
                        }}
                    >
                        <p style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                            Instructions
                        </p>
                        <div style={{ padding: "0 1rem", fontSize: "0.85rem" }}>
                            <ul>
                                <li>
                                    There are 6 questions related to famous
                                    personalities in this quiz.
                                </li>
                                <li>
                                    You need to choose an option from dropdown
                                    to reveal the picture of the personality.
                                </li>
                                <li>
                                    If you don’t know the answer, you will have
                                    an option to move to the next question and
                                    come back later.
                                </li>
                                <li>
                                    Every right answer will get you 100 points
                                    and if you do it in the second attempt you
                                    will get 50 points. For more then 2 attempts
                                    there will be no points.
                                </li>
                                <li>
                                    If you use the hints via Reveal Hint option,
                                    then you will lose 50 points.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
