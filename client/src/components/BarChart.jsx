// src/components/BarChart.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController
);

const BarChart = ({ month }) => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Sale count",
                data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                border: { dash: [6, 6], display: true },
                grid: {
                    display: true,
                },
                ticks: {
                    padding: 15,
                },
            },
            x: {
                beginAtZero: true,
                border: { display: true },
                grid: {
                    display: false,
                },
                ticks: {
                    padding: 7,
                },
            },
        },
    };

    const getBarInfo = async () => {
        try {
            const response = await axios.get(`/api/barchart?month=${month}`);
            const barInfo = response.data;
            setLabels(barInfo.map((d) => d.range));
            setData(barInfo.map((d) => d.count));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBarInfo();
    }, [month]);

    return (
        <div className="m-auto w-3/5">
            <h2 className="font-bold text-3xl p-4 m-4 mt-48">
                Bar Chart Stats - {month.toUpperCase()}
            </h2>
            <Bar data={chartData} options={options} />;
        </div>
    );
};

export default BarChart;
