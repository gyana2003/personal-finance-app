"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [period, setPeriod] = useState("August 2026");
  const periods = ["June 2026", "July 2026", "August 2026"];

  const recentTransactions = [
    ["Blue Bottle Coffee", "Food & dining", "Today, 9:41 AM", "-$5.80"],
    ["Northstar Market", "Groceries", "Yesterday", "-$64.27"],
    ["Lumen Electric", "Home", "Aug 18", "-$82.40"],
  ];

  const budgetSummary = [
    ["Groceries", "$284", "$450", 63],
    ["Dining out", "$164", "$250", 66],
  ];

  const changePeriod = (direction: number) => {
    const nextIndex = Math.max(0, Math.min(periods.length - 1, periods.indexOf(period) + direction));
    setPeriod(periods[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">💰 Personal Finance</h1>
          <div className="flex gap-8">
            <Link href="/" className="text-blue-600 font-semibold hover:text-blue-700">Dashboard</Link>
            <Link href="/transactions" className="text-gray-600 hover:text-gray-900">Transactions</Link>
            <Link href="/budgets" className="text-gray-600 hover:text-gray-900">Budgets</Link>
            <Link href="/investments" className="text-gray-600 hover:text-gray-900">Investments</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Overview - {period}</h2>
          <div className="flex gap-2">
            <button onClick={() => changePeriod(-1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">←</button>
            <button onClick={() => changePeriod(1)} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">→</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border">
            <p className="text-gray-600 text-sm font-medium">Total Income</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">+$3,240.00</p>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border">
            <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">-$1,152.47</p>
            <p className="text-red-600 text-sm mt-2">↑ 8% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border">
            <p className="text-gray-600 text-sm font-medium">Net Balance</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">+$2,087.53</p>
            <p className="text-green-600 text-sm mt-2">Savings rate: 64%</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Link href="/transactions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All →</Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{transaction[0]}</p>
                  <p className="text-sm text-gray-500">{transaction[1]} • {transaction[2]}</p>
                </div>
                <p className="text-lg font-semibold text-red-600">{transaction[3]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Summary */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Budget Overview</h3>
            <Link href="/budgets" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Manage →</Link>
          </div>
          <div className="space-y-4">
            {budgetSummary.map((budget, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-900">{budget[0]}</p>
                  <p className="text-sm text-gray-500">{budget[1]} of {budget[2]}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${budget[3]}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
