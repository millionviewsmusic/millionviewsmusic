"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Element } from "react-scroll";
export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(`Error: ${result.error || "Failed to send message."}`);
      }
    } catch (err) {
      toast.error("Network error. Please try again later.");
    }

    setSending(false);
  };

  return (
    <Element
      name="CONTACT"
      className="min-h-screen bg-[#222831] px-6 py-12 flex flex-col items-center"
    >
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl text-center font-bold mb-10 font-sans pt-10 border-b-2 border-[#00ADB5] w-fit mx-auto pb-4">
        Contact Us
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#393E46] rounded-2xl p-12 flex flex-col gap-8 shadow-lg"
      >
        <label className="text-white font-medium flex flex-col">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-3 rounded bg-[#222831] text-white border border-[#00ADB5] focus:outline-none"
            placeholder="Your full name"
          />
        </label>

        <label className="text-white font-medium flex flex-col">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-3 rounded bg-[#222831] text-white border border-[#00ADB5] focus:outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="text-white font-medium flex flex-col">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="mt-1 p-3 rounded bg-[#222831] text-white border border-[#00ADB5] focus:outline-none resize-none"
            placeholder="Write your message here..."
          />
        </label>

        <button
          type="submit"
          disabled={sending}
          className="px-6 py-3 bg-[#00ADB5] hover:bg-[#019ca3] text-white font-semibold rounded-full transition disabled:opacity-60 cursor-pointer"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </Element>
  );
}
