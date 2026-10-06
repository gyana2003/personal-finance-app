"use client";

import { useState } from "react";
import Link from "next/link";

const holdingsData = [
  ["Vanguard S&P 500", "VOO", "$486.42", "+2.18%", "up", 10],
  ["Apple", "AAPL", "$227.16", "+1.04%", "up", 5],
  ["NVIDIA", "NVDA", "$181.62", "-0.72%", "down", 2],
  ["Microsoft", "MSFT", "$432.10", "+3.45%", "up", 3],
];

export default function Investments() {
  const [holdings, setHoldings] = useState(holdingsData);
  const [tradeStock, setTradeStock] = useState("");
  const [tradeAction, setTradeAction] = useState<"buy" | "sell">("buy");
  const [tradeAmount, setTradeAmount] = useState("");

  const totalValue = holdings.reduce(
    (sum, h) => sum + parseInt(h[2].replace(/\D/g, "")) * h[5],
    0
  );

  const executeTrade = () => {
    if (!tradeStock || !tradeAmount) return;
    setTradeStock("");
    setTradeAction("buy");
    setTradeAmount("");
    alert(`${tradeAction === "buy" ? "Buy" : "Sell"} order for ${tradeAmount} shares of ${tradeStock} executed!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Personal Finance</h1>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link href="/transactions" className="text-gray-600 hover:text-gray-900">Transactions</Link>
            <Link href="/budgets" className="text-gray-600 hover:text-gray-900">Budgets</Link>
            <Link href="/investments" className="text-blue-600 font-semibold">Investments</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Investment Portfolio</h2>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 text-sm font-medium">Portfolio Value</p>
            <p className="text-4xl font-bold text-gray-900 mt-3">${totalValue.toLocaleString()}</p>
            <p className="text-green-600 text-sm mt-2">↑ $1,247 today (+2.1%)</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 text-sm font-medium">Total Holdings</p>
            <p className="text-4xl font-bold text-gray-900 mt-3">{holdings.length}</p>
            <p className="text-gray-600 text-sm mt-2">Stocks &amp; ETFs</p>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 text-sm font-medium">Year to Date</p>
            <p className="text-4xl font-bold text-green-600 mt-3">+18.5%</p>
            <p className="text-gray-600 text-sm mt-2">Performance</p>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white rounded-lg border mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Symbol</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Shares</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Today</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{holding[1]}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{holding[0]}</td>
                    <td className="px-6 py-4 text-gray-900">{holding[5]} shares</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{holding[2]}</td>
                    <td className={`px-6 py-4 font-semibold ${
                      holding[4] === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {holding[3]}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${(parseInt(holding[2].replace(/\D/g, "")) * holding[5]).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setTradeStock(holding[1]);
                          setTradeAction("buy");
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold hover:bg-blue-200 mr-2"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => {
                          setTradeStock(holding[1]);
                          setTradeAction("sell");
                        }}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold hover:bg-red-200"
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trade Modal */}
        {tradeStock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                {tradeAction} {tradeStock}
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Shares
                  </label>
                  <input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setTradeStock("")}
                  className="flex-1 px-4 py-2 border rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={executeTrade}
                  disabled={!tradeAmount}
                  className={`flex-1 px-4 py-2 rounded-lg text-white font-semibold transition ${
                    tradeAction === "buy"
                      ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                      : "bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                  }`}
                >
                  Confirm {tradeAction === "buy" ? "Buy" : "Sell"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
