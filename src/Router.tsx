import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";

import Menu from "./pages/Menu";
import Actions from "./pages/Actions";
import ManageUser from "./pages/Admin/ManageUser";
// import ManageAll from "./pages/Admin/Manage";
import Orders from "./pages/Orders/Orders";
import ManageAll from "./pages/Admin/Manage";
import OrderCalendar from "./pages/Orders/OrderCalendar";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "sample",
                element: <Sample />,
            },
            {
                path: "empty",
                element: <Empty />,
            },
            {
                path: "Manage",
                element: <ManageAll />,
            },
            {
                path: "Users",
                element: <ManageUser />,
            },   
            {
                path: "Orders",
                element: <Orders />,
            },   
            {
                path: "OrderCalendar",
                element: <OrderCalendar />,
            },   

            {
                path: "Menu",
                element: <Menu />,
            },
            {
                path: "Actions",
                element: <Actions />,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
], {
    basename: global.basename
})
