import React from "react";
import { createBrowserRouter, 
    RouterProvider } from "react-router";
import { NotFound } from "../components/NotFound";
import { Navbar } from "./Navbar";
import { Home } from "../pages/home/Home";
import { Register } from "../pages/reg/Register";
import { Login } from "../pages/log/Login";
import { Story } from "../pages/story/Story";
import { Write } from "../pages/write/Write";

const RouteList = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/story/:id",
                element: <Story />
            },
            {
                path: "/write",
                element: <Write />
            },
            {
                path: "/write/:id",
                element: <Write />
            }
        ]
    }
]);

export const NavRoutes = () => {
    return (
        <React.Fragment>
            <RouterProvider router={RouteList} />
        </React.Fragment>
    );
};




