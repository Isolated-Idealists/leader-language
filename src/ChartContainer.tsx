import React, { useRef, useEffect } from "react";
import ChartJs from "chart.js";
import { makeStyles } from "@material-ui/core";
import { ChartDataPoint, FireDataPoints as FireDataMap } from "./Query";

interface ChartProps {
    dataPoints: ChartDataPoint[];
    fireDataPoints?: FireDataMap;
}

const useChartStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
    },
}));

const WordReferencesChart: React.FunctionComponent<ChartProps> = (props) => {
    const { dataPoints } = props;
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

        const datasets: any[] = [
            {
                label: "Transcript Release Date",
                data: dataPoints.map((point) => point.references),
            },
        ];

        if (props.fireDataPoints) {
            const data = Object.entries(props.fireDataPoints).map(
                ([_, value]) => value
            );
            datasets.push({
                label: "Fire Ban Statistics (Yearly)",
                data,
                backgroundColor: "rgb(207, 73, 66)",
                borderColor: "rgb(207, 73, 66)",
                borderWidth: 2,
                fill: false,
                tension: 0.6,
            });
        }

        const labels = dataPoints.map((point) => point.transcript.releaseDate);

        const newChart = new ChartJs(canvasCtx, {
            type: "line",
            data: {
                labels,
                datasets,
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
                            position: "top",
                            display: true,
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                            display: false,
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                elements: {
                    line: {
                        backgroundColor: "rgb(76, 130, 181)",
                        borderColor: "rgb(76, 130, 181)",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.6,
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        });
        return () => {
            newChart.destroy();
        };
    }, [chartRef, dataPoints, props.fireDataPoints]);

    return (
        <div className={classes.container}>
            <canvas ref={chartRef} style={{ height: "100%", width: "100%" }} />
        </div>
    );
};

export default WordReferencesChart;
