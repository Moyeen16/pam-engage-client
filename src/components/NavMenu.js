import React, { Component } from "react";
import { TopNavbar } from "ms-custom-react-components-library";
import logo from "./../assets/Icons/zs-logo-small.png";
import { Timer } from "@styled-icons/boxicons-solid/Timer";
import { useSelector } from "react-redux";
import { globalStore } from "../store/globalStore";
import { InputCheckedOutline } from "@styled-icons/typicons/InputCheckedOutline";
import { useLocation } from "react-router-dom";
export default function NavMenu() {
    const location = useLocation();

    const store = useSelector(globalStore);

    return (
        <div
            style={{
                position: "fixed",
                zIndex: "100",
                width: "100%",
                top: "0",
            }}
        >
            <TopNavbar
                applicationName="Find Your Leader"
                logo={logo}
                extra={
                    location.pathname === "/leaderboard" ? null : (
                        <div style={{ width: "5rem" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                }}
                            >
                                <Timer
                                    size={24}
                                    style={{
                                        color: "#27a6a4",
                                        marginRight: "0.2rem",
                                    }}
                                />
                                {store.timeElapsed} s
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                }}
                            >
                                <InputCheckedOutline
                                    size={24}
                                    style={{
                                        color: "#ec7200",
                                        marginRight: "0.2rem",
                                    }}
                                />
                                {store.score} pts
                            </div>
                        </div>
                    )
                }
            />
        </div>
    );
}
