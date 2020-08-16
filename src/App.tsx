import React, { useState, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    TextField,
    createMuiTheme,
    ThemeProvider,
    Paper,
    Link,
} from "@material-ui/core";
import WordReferencesChart from "./ChartContainer";
import { queryData, ChartDataPoint, fires } from "./Query";

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
        textField: {
            backgroundColor: "#f9f9f9",
        },
        mainContent: {
            width: "40%",
            margin: theme.spacing(0, "auto"),
        },
        timelineContainer: {
            padding: theme.spacing(1),
            backgroundColor: "#f9f9f9",
            width: "100%",
            height: "40%",
            position: "fixed",
            bottom: 0,
        },
        logo: {
            display: "block",
            margin: theme.spacing(2, "auto"),
            width: 100,
        },
        references: {
            marginTop: theme.spacing(2),
            maxHeight: 200,
            overflow: "auto",
            backgroundColor: "#f9f9f9",
        },
        referenceListItem: {
            padding: theme.spacing(1, 0),
            listStyleType: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "90%",
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
        return (
            <WordReferencesChart
                dataPoints={dataPoints}
                fireDataPoints={
                    query.toLowerCase() === "fire" ? fires : undefined
                }
            />
        );
    }, [dataPoints, query]);

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
                    className={classes.textField}
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
                <Paper
                    elevation={0}
                    variant="outlined"
                    className={classes.references}
                >
                    <Typography variant="h6" align="center" gutterBottom>
                        Key Transcripts
                    </Typography>
                    {dataPoints.some((point) => point.references >= 7) ? (
                        <ul>
                            {dataPoints.map((point) => (
                                <li
                                    key={point.transcript.transcriptId}
                                    className={classes.referenceListItem}
                                >
                                    <Link
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`https://pmtranscripts.pmc.gov.au/release/transcript-${point.transcript.transcriptId}`}
                                    >
                                        {point.transcript.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography gutterBottom align="center">
                            No significant references found
                        </Typography>
                    )}
                </Paper>
            </div>
            <div className={classes.timelineContainer}>{chartMemo}</div>
        </ThemeProvider>
    );
};

export default App;
