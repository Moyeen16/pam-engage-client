import React from "react";
import { Button, Input, Table } from "ms-custom-react-components-library";
import { leaderboardData } from "../../DummyData/leaderboard_data";
import first from "../../assets/Icons/first-rank.png";
import second from "../../assets/Icons/second-rank.png";
import third from "../../assets/Icons/third-rank.png";
import fourth from "../../assets/Icons/fourth-rank.png";
import fifth from "../../assets/Icons/fifth-rank.png";
import axios from "axios";
import { LineWave } from "react-loader-spinner";
export default function Leaderboard() {
    const PASSCODE_TEXT = "abc123";
    const [showLeaderboard, setShowLeaderboard] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [tableData, setTableData] = React.useState();
    const [passcodeText, setPasscodeText] = React.useState();
    const [errorPasscode, setErrorPasscode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const headers = [
        {
            key: "rank",
            title: "RANK",
            dataIndex: "rank",
            align: "center",
            widthPercentage: 5,
            customComponent: (data) => {
                if (data === 1)
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={first} style={{ height: "2rem" }} />
                        </div>
                    );
                else if (data === 2)
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={second} style={{ height: "2rem" }} />
                        </div>
                    );
                else if (data === 3)
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={third} style={{ height: "2rem" }} />
                        </div>
                    );
                else if (data === 4)
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={fourth} style={{ height: "1.6rem" }} />
                        </div>
                    );
                else if (data === 5)
                    return (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={fifth} style={{ height: "1.5rem" }} />
                        </div>
                    );
                else return <div>{data}</div>;
            },
        },
        {
            key: "teammame",
            title: "TEAM NAME",
            dataIndex: "teamname",
            widthPercentage: 50,
        },

        {
            key: "scores",
            title: "SCORE",

            dataIndex: "scores",
        },
        {
            key: "responsetime",
            title: "TIME",
            dataIndex: "responsetime",

            customComponent: (data) => data + " s",
        },
    ];
    const fetchData = async () => {
        setLoading(true);
        axios
            .get(
                "https://pam-engagement-server-renderprod.onrender.com/leaderboardData"
            )
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    const temp = [];
                    response.data.map((el, index) =>
                        temp.push({ ...el, rank: index + 1 })
                    );
                    setTableData({ headers: headers, data: temp });
                }
            });
    };
    const passwordToggle = (toggleValue) => {
        setShowPassword(toggleValue);
    };

    const handleSubmit = () => {
        if (passcodeText !== PASSCODE_TEXT) setErrorPasscode(true);
        else setShowLeaderboard(true);
    };

    React.useEffect(() => {
        if (showLeaderboard) fetchData();
    }, [showLeaderboard]);
    const ht = window.innerHeight;
    return (
        <div
            style={{
                maxWidth: "40rem",
                margin: "auto",
                marginTop: "64px",
                padding: "2rem",
            }}
        >
            {showLeaderboard ? (
                loading ? (
                    <div
                        style={{
                            height: `calc(${ht}px - 64px - 4rem)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LineWave
                            visible={true}
                            height="200"
                            width="200"
                            color="#27a6a4"
                            ariaLabel="line-wave-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            firstLineColor=""
                            middleLineColor=""
                            lastLineColor=""
                        />
                    </div>
                ) : (
                    <>
                        <div style={{ fontSize: "1.8rem", fontWeight: "500" }}>
                            Leaderboard
                        </div>
                        {tableData && <Table tableData={tableData} />}
                    </>
                )
            ) : (
                <div>
                    <p style={{ marginBottom: "1rem" }}>
                        Enter passcode to view leaderboard
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "1.5rem",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                width: "20rem",
                            }}
                        >
                            <Input
                                type="password"
                                placeholder="Enter passcode"
                                visibilityToggle={{
                                    visible: showPassword,
                                    onVisibleChange: passwordToggle,
                                }}
                                value={passcodeText}
                                onChange={(e) => {
                                    setPasscodeText(e.target.value);
                                    setErrorPasscode(false);
                                }}
                                validation={{
                                    error: errorPasscode,
                                    message: "Incorrect Passcode",
                                }}
                                onPressEnter={(e) => handleSubmit()}
                            />
                        </div>
                        <Button primary small password onClick={handleSubmit}>
                            Show Leaderboard
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
