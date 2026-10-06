"use client";

import { useState } from "react";
import Link from "next/link";

const transactionData = [
  ["Blue Bottle Coffee", "Food & dining", "Today, 9:41 AM", "-$5.80"],
  ["Northstar Market", "Groceries", "Yesterday", "-$64.27"],
  ["Lumen Electric", "Home", "Aug 18", "-$82.40"],
  ["Acme Co. Payroll", "Income", "Aug 15", "+$3,240.00"],
  ["Amazon Purchase", "Shopping", "Aug 14", "-$127.50"],
  ["Uber Eats", "Food & dining", "Aug 13", "-$24.99"],
];

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = transactionData.filter((t) =>
    t[0].toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" ||
      (filter === "income" && t[3].startsWith("+")) ||
      (filter === "expense" && t[3].startsWith("-")))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Personal Finance</h1>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link href="/transactions" className="text-blue-600 font-semibold">Transactions</Link>
            <Link href="/budgets" className="text-gray-600 hover:text-gray-900">Budgets</Link>
            <Link href="/investments" className="text-gray-600 hover:text-gray-900">Investments</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Transactions</h2>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Transactions</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg border divide-y">
          {filtered.length > 0 ? (
            filtered.map((transaction, idx) => (
              <div
                key={idx}
                className="p-6 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{transaction[0]}</h3>
                  <p className="text-sm text-gray-500">{transaction[1]} • {transaction[2]}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    transaction[3].startsWith("+") ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction[3]}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No transactions found</p>
            </div>
          )}
        </div>

        {/* Add Transaction Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Add New Transaction
          </Link>
        </div>
      </div>
    </div>
  );
}
