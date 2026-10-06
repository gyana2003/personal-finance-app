"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        // Store user session
        localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
        window.location.href = "/";
      } else {
        setError("Please enter email and password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">💰</h1>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Personal Finance</h2>
            <p className="text-gray-600 mt-1">Trading & Investment Platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center">
            <Link href="/forgot-password" className="block text-sm text-blue-600 hover:text-blue-700">
              Forgot your password?
            </Link>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <Link href="/public-accounts" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                View Public Trading Accounts
              </Link>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Email: <code className="bg-white px-2 py-1 rounded">demo@example.com</code></p>
            <p>Password: <code className="bg-white px-2 py-1 rounded">demo123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
