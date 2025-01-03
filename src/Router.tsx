import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";

import Manage from "./pages/Manage";
import Menu from "./pages/Menu";
import Actions from "./pages/Actions";
import ManageUser from "./pages/Admin/ManageUser";
import ManageVendor from "./pages/Admin/ManageVendor";
import Orders from "./pages/User/Orders";
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
                element: <Manage />,
            },
            {
                path: "Manage/Users",
                element: <ManageUser />,
            },   
            {
                path: "Orders",
                element: <Orders />,
            },   
            {
                path: "Manage/Vendor",
                element: <ManageVendor />,
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
