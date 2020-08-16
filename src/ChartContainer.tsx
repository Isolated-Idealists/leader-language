import React, { useRef, useEffect } from "react";
import ChartJs from "chart.js";
import { makeStyles } from "@material-ui/core";
import { transcripts } from "./Query";

interface ChartProps {
    weightings: number[];
}

const useChartStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
    },
}));

const LineChart: React.FunctionComponent<ChartProps> = (props) => {
    const { weightings } = props;
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
        const newChart = new ChartJs(canvasCtx, {
            type: "line",
            data: {
                labels: transcripts.map((t) => t.releaseDate),
                datasets: [
                    {
                        label: "Transcript Release Date",
                        data: weightings,
                    },
                ],
            },
            options: {
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: true,
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                            display: false,
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                            display: false,
                        },
                    ],
                },
                animation: {
                    duration: 0,
                },
                hover: {
                    animationDuration: 0,
                },
                responsiveAnimationDuration: 0,
                elements: {
                    line: {
                        backgroundColor: "rgb(76, 130, 181)",
                        borderColor: "rgb(76, 130, 181)",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.2,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        });
        return () => {
            newChart.destroy();
        };
    }, [chartRef, weightings]);

    return (
        <div className={classes.container}>
            <canvas ref={chartRef} style={{ height: "100%", width: "100%" }} />
        </div>
    );
};

export default LineChart;
