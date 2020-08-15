import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
        mainContent: {
            width: 400,
            margin: theme.spacing(0, "auto"),
        },
        timelineContainer: {
            width: "100%",
            height: "35%",
            position: "fixed",
            bottom: 0,
            backgroundColor: "#f2f2f2",
        },
    };
});

const App: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.mainContent}>
                <header>
                    <Typography align="center">Marcy waz here</Typography>
                </header>
                <TextField variant="filled" label="Search Term" fullWidth />
            </div>
            <div className={classes.timelineContainer}>
                <Typography align="center">Cool timeline thing</Typography>
            </div>
        </>
    );
};

export default App;
