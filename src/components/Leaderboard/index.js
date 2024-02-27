import React from "react";

import { leaderboardData } from "../../DummyData/leaderboard_data";
export default function Leaderboard() {
    const [tableData, setTableData] = React.useState();
    const headers = [
        {
            key: "rank",
            title: "RANK",
            dataIndex: "rank",
            align: "center",
            widthPercentage: 5,
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
    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <div style={{ maxWidth: "40rem", margin: "auto" }}>
            {/* <Table tableData={tableData} /> */}
        </div>
    );
}
