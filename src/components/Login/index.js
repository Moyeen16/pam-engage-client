import { Input, Button } from "antd";
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
        sessionStorage.setItem("teamName", teamNameLocal);
        console.log(teamNameLocal);
        dispatch(setTeamName(teamNameLocal));
        setIsLoading(true);
        navigate("/home");
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
                <div style={{ maxHeight: "85vh", overflowY: "auto" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "40vh",
                            paddingInline: "5rem",
                        }}
                    >
                        <div>
                            <h5>Enter your team name to get started!</h5>
                            <Input
                                placeholder="Enter Team Name"
                                defaultValue={teamNameLocal}
                                onChange={(e) => {
                                    onBlurTeamNameLocal(e.target.value);
                                }}
                                onPressEnter={onFinish}
                                style={{ marginTop: "1rem" }}
                            />
                            <Button
                                type="primary"
                                onClick={onFinish}
                                style={{
                                    marginTop: "1rem",
                                    backgroundColor: "#27a6a4",
                                }}
                            >
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
                        <h6>Instructions</h6>
                        <ul>
                            <li>
                                There are 6 questions related to famous
                                personalities in this quiz.
                            </li>
                            <li>
                                You need to choose an option from dropdown to
                                reveal the picture of the personality.
                            </li>
                            <li>
                                If you don’t know the answer, you will have an
                                option to move to the next question and come
                                back later.
                            </li>
                            <li>
                                Every right answer will get you 100 points and
                                if you do it in the second attempt you will get
                                50 points. For more then 2 attempts there will
                                be no points.
                            </li>
                            <li>
                                If you use the hints via Reveal Hint option,
                                then you will lose 50 points.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
