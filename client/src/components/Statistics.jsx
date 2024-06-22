import React, { useEffect, useState } from "react";
import apiConfig from "../api.config.js";

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState(null);

    const getStatistics = async () => {
        try {
            const response = await fetch(`${apiConfig.URL}/api/statistics?month=${month}`);
            setStatistics(await response.json());
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getStatistics();
    }, [month]);

    return (
        <div className="flex flex-col text-center m-auto mt-48 w-3/5">
            <h2 className="font-bold text-3xl p-4 m-4">Statistics - {month.toUpperCase()}</h2>
            <div className="bg-yellow-400 rounded-xl p-4 w-60 m-auto">
                <p className="flex justify-between">
                    <span>Total Sale</span>
                    <span>{statistics?.totalSaleAmount}</span>
                </p>
                <p className="flex justify-between">
                    <span>Total Sold Items</span>
                    <span>{statistics?.totalSoldItems}</span>
                </p>
                <p className="flex justify-between">
                    <span>Total Not Sold Items</span>
                    <span>{statistics?.totalNotSoldItems}</span>
                </p>
            </div>
        </div>
    );
};

export default Statistics;
