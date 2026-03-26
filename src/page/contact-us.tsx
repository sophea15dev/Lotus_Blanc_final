import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState({
    name: false,
    email: false,
  });

  const [success, setSuccess] = useState(false);

  // HANDLE INPUT
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "name") {
      setError((prev) => ({
        ...prev,
        name: value.trim() === "",
      }));
    }

    if (name === "email") {
      setError((prev) => ({
        ...prev,
        email: !/\S+@\S+\.\S+/.test(value),
      }));
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (form.name.trim() === "" || !/\S+@\S+\.\S+/.test(form.email)) {
      setError({
        name: form.name.trim() === "",
        email: !/\S+@\S+\.\S+/.test(form.email),
      });
      return;
    }

    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    /* 1. min-h-screen and w-full ensures it fills the viewport */
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND - absolute inset-0 makes it fill the parent exactly */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.ctfassets.net/0dkgxhks0leg/2W0e0i39df3qb9O05tsm8W/877bbaef4e6158eef162496144faf2f5/TF_20FW_22_20Dessert_20Collection_498.jpg)",
        }}
      />

      {/* OVERLAY - darkened for readability */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* FORM CONTAINER - added max-sm:px-4 to handle mobile padding gracefully */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 w-full max-w-md mx-4 backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20 animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-tight">
          Contact Us
        </h2>

        {/* NAME */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white/90">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-full bg-white/90 text-gray-800 outline-none transition-all focus:ring-2 focus:ring-orange-400
              ${error.name ? "border-2 border-red-500" : "border-none"}
            `}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white/90">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-full bg-white/90 text-gray-800 outline-none transition-all focus:ring-2 focus:ring-orange-400
              ${error.email ? "border-2 border-red-500" : "border-none"}
            `}
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white/90">Message:</label>
          <textarea
            name="message"
            placeholder="How can we help?"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-white/90 text-gray-800 outline-none resize-none transition-all focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3 rounded-full transition-all shadow-lg"
        >
          Send Message
        </button>
      </form>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce">
          🎉 Message Sent Successfully!
        </div>
      )}

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}
      </style>
    </div>
  );
}