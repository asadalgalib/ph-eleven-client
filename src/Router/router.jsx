import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Components/LayOuts/MainLayout";
import HomeLayout from "../Components/LayOuts/HomeLayout";
import Login from "../Components/UserSign/Login";
import Register from "../Components/UserSign/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <HomeLayout></HomeLayout>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
]);

export default router;