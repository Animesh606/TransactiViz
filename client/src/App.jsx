import React, { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable.jsx";
import Statistics from "./components/Statistics.jsx";
import BarChart from "./components/BarChart.jsx";

const App = () => {
    const [month, setMonth] = useState("march");

    return (
        <div className="m-auto w-4/5">
            <div className="m-4 p-4 bg-gray-200 rounded-xl">
                <TransactionsTable month={month} setMonth={setMonth} />
                <Statistics month={month} />
                <BarChart month={month} />
            </div>
        </div>
    );
};

export default App;
