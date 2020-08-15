import React, { useRef, useEffect } from "react";
import ChartJs from "chart.js";
import { makeStyles } from "@material-ui/core";

interface ChartProps {
    options: ChartJs.ChartConfiguration;
}

const useChartStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
    },
}));

const ChartContainer: React.FunctionComponent<ChartProps> = (props) => {
    const classes = useChartStyles();
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        const canvasCtx = chartRef.current.getContext("2d");
        if (!canvasCtx) {
            throw new Error("Could not obtain canvas context!");
        }
        const newChart = new ChartJs(canvasCtx, props.options);
        return () => {
            newChart.destroy();
        };
    }, [chartRef, props.options]);

    return (
        <div className={classes.container}>
            <canvas
                id="myChart"
                ref={chartRef}
                style={{ height: "100%", width: "100%" }}
            />
        </div>
    );
};

export default ChartContainer;
