import React from "react";

const Login = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <main
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#222831" }}
    >
      <div
        className="p-8 rounded-md w-full max-w-md"
        style={{
          backgroundColor: "#393e46",
          border: "1.5px solid white",
        }}
      >
        <h1 className="text-white text-3xl mb-6 font-semibold text-center">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded border border-white bg-[#222831] text-white placeholder-[#88a1a6] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded border border-white bg-[#222831] text-white placeholder-[#88a1a6] focus:outline-none"
          />
          <button
            type="submit"
            className="py-3 cursor-pointer bg-[#019ca3] rounded text-white font-semibold hover:bg-[#01797f] transition"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
