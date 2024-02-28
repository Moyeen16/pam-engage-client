import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";

const AppRoutes = [
    {
        index: true,
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    { path: "/leaderboard", element: <Leaderboard /> },
];

export default AppRoutes;
