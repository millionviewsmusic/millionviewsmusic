"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Element } from "react-scroll";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 20; // users per page
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(" data from backend", data);
        setUsers(data.users);
        setTotalUsers(data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        toast.error("Failed to load users.");
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <Element
      name="USERS"
      className="min-h-screen bg-[#222831] px-6 py-12 flex flex-col items-center"
    >
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-10 font-sans pt-10 border-b-2 border-[#00ADB5] w-fit mx-auto pb-4">
        User Emails
      </h1>

      <div className="w-full max-w-3xl bg-[#393E46] rounded-2xl p-8 shadow-lg">
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-white text-center">No users found.</p>
        ) : (
          <>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-[#00ADB5] border-b border-[#00ADB5]">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Email</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, idx) => (
                  <tr key={user.email} className="border-b border-gray-700">
                    <td className="py-3 px-4 text-white">
                      {(page - 1) * limit + idx + 1}
                    </td>
                    <td className="py-3 px-4 text-white">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="bg-[#00ADB5] text-[#222831] font-bold px-4 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-white self-center">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="bg-[#00ADB5] text-[#222831] font-bold px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </Element>
  );
}
