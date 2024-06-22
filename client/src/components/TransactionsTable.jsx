import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionsTable = ({ month, setMonth }) => {
    const [ search, setSearch ] = useState("");
    const [ transactions, setTransactions ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ perPage, setPerPage ] = useState(10);

    const getTransactions = async () => {
        // fetch transactions from API
        try {
            const response = await axios.get(`/api/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPage}`);
            setTransactions(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTransactions();
    }, [search, month, page, perPage]);

    return (
        <>
            <div className="flex justify-center">
                <div className="flex justify-center rounded-full m-auto bg-white h-40 w-40">
                    <span className="content-center text-center font-bold text-xl">Transaction Dashboard</span>
                </div>
            </div>
            <div className="flex justify-between m-4 p-2">
                <input className="rounded-xl px-4 py-1 bg-yellow-100 border-2 border-slate-500"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search transactions"
                />
                <select className="rounded-xl px-4 py-1 bg-yellow-100 border-2 border-slate-500" value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="january">Jan</option>
                    <option value="february">Feb</option>
                    <option value="march">Mar</option>
                    <option value="april">Apr</option>
                    <option value="may">May</option>
                    <option value="june">Jun</option>
                    <option value="july">Jul</option>
                    <option value="august">Aug</option>
                    <option value="september">Sep</option>
                    <option value="october">Oct</option>
                    <option value="november">Nov</option>
                    <option value="december">Dec</option>
                </select>
            </div>
            {transactions ? (
                <table className="m-4 bg-yellow-100 p-6 border-spacing-2 border-2 rounded-2xl overflow-hidden">
                    <thead>
                        <tr>
                            <th className="border-2 border-slate-900 p-2">ID</th>
                            <th className="border-2 border-slate-900 p-2">Title</th>
                            <th className="border-2 border-slate-900 p-2">Description</th>
                            <th className="border-2 border-slate-900 p-2">Price</th>
                            <th className="border-2 border-slate-900 p-2">Category</th>
                            <th className="border-2 border-slate-900 p-2">Sold</th>
                            <th className="border-2 border-slate-900 p-2">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id}>
                                <td className="border-2 border-slate-900 p-2">{tx.id}</td>
                                <td className="border-2 border-slate-900 p-2">{tx.title}</td>
                                <td className="border-2 border-slate-900 p-2">{tx.description}</td>
                                <td className="border-2 border-slate-900 p-2">{tx.price}</td>
                                <td className="border-2 border-slate-900 p-2">{tx.category}</td>
                                <td className="border-2 border-slate-900 p-2">{tx.sold ? "Yes" : "No"}</td>
                                <td className="border-2 border-slate-900 p-2"><img src={tx.image} alt={tx.title} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : <></>
            }
            <div className=" flex justify-around">
                <div>
                    <span>Page No.</span>
                    <input className="w-8" type="number" value={page} onChange={(e) => setPage((e.target.value < 1) ? 1 : e.target.value )} />
                </div>
                <div>
                    <button className="px-2 hover:bg-slate-400 rounded-xl" onClick={() => setPage((p) => (p == 1) ? p : p - 1)}>Prev</button>
                    <span> - </span>
                    <button className="px-2 hover:bg-slate-400 rounded-xl" onClick={() => setPage((p) => (transactions.length) ? p + 1 : p)}>Next</button>
                </div>
                <div>
                    <span>Per Page: </span>
                    <input className="w-8" type="number" value={perPage} onChange={(e) => setPerPage((e.target.value < 1) ? 1 : e.target.value )} />
                </div>
            </div>
        </>
    );
};

export default TransactionsTable;
