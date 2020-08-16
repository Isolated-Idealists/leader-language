import React, { useState, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    TextField,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core";
import WordReferencesChart from "./ChartContainer";
import { queryData, ChartDataPoint } from "./Query";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Cinzel, serif",
    },
});

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
            margin: theme.spacing(2, "auto"),
            width: 100,
        },
    };
});

const App: React.FunctionComponent = () => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [dataPoints, setDataPoints] = useState<ChartDataPoint[]>([]);
    const executeQuery = useCallback(
        debounce((word: string) => {
            setDataPoints(queryData(word));
        }, 250),
        []
    );

    const chartMemo = useMemo(() => {
        return <WordReferencesChart dataPoints={dataPoints} />;
    }, [dataPoints]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.mainContent}>
                <header>
                    <img
                        src="/logo.png"
                        className={classes.logo}
                        alt="for the record logo"
                    />
                    <Typography variant="h3" align="center" gutterBottom>
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
        </ThemeProvider>
    );
};

export default App;
