import React, { useRef, useEffect } from "react";
import ChartJs from "chart.js";
import { makeStyles } from "@material-ui/core";

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
                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: weightings,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                            position: "top",
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
                elements: {
                    line: {
                        backgroundColor: "rgb(76, 130, 181)",
                        borderColor: "rgb(76, 130, 181)",
                        borderWidth: 50,
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
