import React from "react";
import { Button, Input, Table } from "ms-custom-react-components-library";
import { leaderboardData } from "../../DummyData/leaderboard_data";
import first from "../../assets/Icons/first-rank.png";
import second from "../../assets/Icons/second-rank.png";
import third from "../../assets/Icons/third-rank.png";
export default function Leaderboard() {
    const PASSCODE_TEXT = "abc123";
    const [showLeaderboard, setShowLeaderboard] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [tableData, setTableData] = React.useState();
    const [passcodeText, setPasscodeText] = React.useState();
    const [errorPasscode, setErrorPasscode] = React.useState(false);
    const headers = [
        {
            key: "rank",
            title: "RANK",
            dataIndex: "rank",
            align: "center",
            widthPercentage: 5,
            customComponent: (data) => {
                if (data === 1) return <img src={first} />;
                else if (data === 2) return <img src={second} />;
                else if (data === 3) return <img src={third} />;
                else return data;
            },
        },
        {
            key: "teamName",
            title: "TEAM NAME",
            dataIndex: "teamName",
            widthPercentage: 70,
        },

        {
            key: "score",
            title: "SCORE",
            dataIndex: "score",
        },
    ];
    const fetchData = async () => {
        //API CALL HERE
        setTableData({ headers: headers, data: leaderboardData });
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
    return (
        <div style={{ maxWidth: "40rem", margin: "auto", padding: "2rem" }}>
            {showLeaderboard ? (
                <>
                    <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                        Leaderboard
                    </div>
                    {tableData && <Table tableData={tableData} />}
                </>
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
