import React, { Component } from "react";
import { TopNavbar } from "ms-custom-react-components-library";
import logo from "./../assets/Icons/zs-logo-small.png";
import { Timer } from "@styled-icons/boxicons-solid/Timer";
import { useSelector } from "react-redux";
import { globalStore } from "../store/globalStore";
import { InputCheckedOutline } from "@styled-icons/typicons/InputCheckedOutline";
export default function NavMenu() {
    const store = useSelector(globalStore);

    return (
        <TopNavbar
            applicationName="Find Your Leader"
            logo={logo}
            extra={
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
                            style={{ color: "#27a6a4", marginRight: "0.2rem" }}
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
                            style={{ color: "#ec7200", marginRight: "0.2rem" }}
                        />
                        {store.score} pts
                    </div>
                </div>
            }
        />
    );
}
