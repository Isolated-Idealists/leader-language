import React, { useState, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import LineChart from "./ChartContainer";
import { queryData } from "./Query";

function debounce(func: any, wait: number, immediate?: boolean): any {
    var timeout: any = undefined;
    return function (this: any) {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = undefined;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const useStyles = makeStyles((theme) => {
    return {
        mainContent: {
            width: "40%",
            margin: theme.spacing(0, "auto"),
        },
        timelineContainer: {
            width: "100%",
            height: "50%",
            position: "fixed",
            bottom: 0,
        },
        logo: {
            display: "block",
            margin: theme.spacing(0, "auto"),
        },
    };
});

const App: React.FunctionComponent = () => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [weightings, setWeightings] = useState<number[]>([]);
    const executeQuery = useCallback(
        debounce((word: string) => {
            setWeightings(queryData(word));
        }, 250),
        []
    );

    const chartMemo = useMemo(() => {
        return <LineChart weightings={weightings} />;
    }, [weightings]);

    return (
        <>
            <div className={classes.mainContent}>
                <header>
                    <img
                        src="/logo.png"
                        className={classes.logo}
                        alt="for the record logo"
                    />
                    <Typography variant="h3" align="center">
                        For the Record
                    </Typography>
                </header>
                <TextField
                    variant="outlined"
                    label="Search Term"
                    helperText="Enter a political term, controversial topic or viewpoint"
                    fullWidth
                    value={query}
                    onChange={(e) => {
                        const term = e.target.value;
                        executeQuery(term);
                        setQuery(term);
                    }}
                />
            </div>
            <div className={classes.timelineContainer}>{chartMemo}</div>
        </>
    );
};

export default App;
