import React from "react";
import "./App.css";
import Cooper from "@public/Cooper and David.webp";

export const App = () => {
    return (
        <React.Fragment>
            <h1>Cooper and David</h1>
            <img 
                src={Cooper} alt="Cooper and David" 
                height={"600px"} width={"auto"}
            />
        </React.Fragment>
    );
};


