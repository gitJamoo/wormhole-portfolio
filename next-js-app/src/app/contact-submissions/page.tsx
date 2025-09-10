"use client";

import { useState, useEffect } from "react";

const PASSWORD = "SUPER_SECURE_PASSWORD"; // Replace with a strong password

interface Submission {
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function ContactSubmissions() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (authenticated) {
      const fetchSubmissions = async () => {
        try {
          const response = await fetch("/api/contact-submissions");
          if (response.ok) {
            const data = await response.json();
            setSubmissions(data);
          } else {
            setError("Failed to fetch submissions.");
          }
        } catch (error) {
          setError("Failed to fetch submissions.");
        }
      };
      fetchSubmissions();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Submissions</h1>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <p>
                <strong>Name:</strong> {submission.name}
              </p>
              <p>
                <strong>Email:</strong> {submission.email}
              </p>
              <p>
                <strong>Message:</strong> {submission.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(submission.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
