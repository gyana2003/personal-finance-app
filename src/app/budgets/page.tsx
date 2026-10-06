"use client";

import { useState } from "react";
import Link from "next/link";

type Budget = [name: string, spent: string, limit: string, percentage: number];

const budgetData = [
  ["Groceries", "$284", "$450", 63],
  ["Dining out", "$164", "$250", 66],
  ["Transport", "$96", "$180", 53],
  ["Entertainment", "$45", "$100", 45],
  ["Utilities", "$82", "$150", 55],
] satisfies Budget[];

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>(budgetData);
  const [newBudgetName, setNewBudgetName] = useState("");
  const [newBudgetLimit, setNewBudgetLimit] = useState("");

  const addBudget = () => {
    if (newBudgetName && newBudgetLimit) {
      setBudgets([
        ...budgets,
        [newBudgetName, "$0", `$${newBudgetLimit}`, 0],
      ]);
      setNewBudgetName("");
      setNewBudgetLimit("");
    }
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
            <Link href="/budgets" className="text-blue-600 font-semibold">Budgets</Link>
            <Link href="/investments" className="text-gray-600 hover:text-gray-900">Investments</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Budget Management</h2>

        {/* Add New Budget */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Budget</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              value={newBudgetName}
              onChange={(e) => setNewBudgetName(e.target.value)}
              placeholder="Budget name"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={newBudgetLimit}
              onChange={(e) => setNewBudgetLimit(e.target.value)}
              placeholder="Monthly limit"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addBudget}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Add Budget
            </button>
          </div>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgets.map((budget, idx) => {
            const spent = parseInt(budget[1].replace(/\D/g, ""));
            const limit = parseInt(budget[2].replace(/\D/g, ""));
            const percentage = Math.round((spent / limit) * 100);

            return (
              <div key={idx} className="bg-white p-6 rounded-lg border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{budget[0]}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {budget[1]} of {budget[2]}
                    </p>
                  </div>
                  <span className={`text-xl font-bold ${
                    percentage > 80 ? "text-red-600" : percentage > 60 ? "text-yellow-600" : "text-green-600"
                  }`}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition ${
                      percentage > 80 ? "bg-red-600" : percentage > 60 ? "bg-yellow-500" : "bg-green-600"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-600 text-sm">Total Budgets</p>
              <p className="text-3xl font-bold text-blue-600">{budgets.length}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Limit</p>
              <p className="text-3xl font-bold text-blue-600">
                ${budgets.reduce((sum, b) => sum + parseInt(b[2].replace(/\D/g, "")), 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Spent</p>
              <p className="text-3xl font-bold text-blue-600">
                ${budgets.reduce((sum, b) => sum + parseInt(b[1].replace(/\D/g, "")), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
