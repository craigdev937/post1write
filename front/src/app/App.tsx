import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { NavRoutes } from "../routes/NavRoutes";
import { RED } from "../global/RED";

export const App = () => {
    return (
        <Provider store={RED}>
            <React.Fragment>
                <NavRoutes />
            </React.Fragment>
        </Provider>
    );
};


