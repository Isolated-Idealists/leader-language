import React from "react";
import logo from "./logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles({
    root: {},
});

const App: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div>
            <header>
                <Typography>Title or Logo</Typography>
            </header>
            <div>
                <TextField />
            </div>
            <div>
                <Typography>Cool graph</Typography>
            </div>
        </div>
    );
};

export default App;
