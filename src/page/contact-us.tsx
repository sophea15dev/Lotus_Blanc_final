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
  const handleChange = (e: any) => {
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

  // ✅ HANDLE SUBMIT
  const handleSubmit = (e: any) => {
    e.preventDefault(); // ❗ prevent reload

    // validate before submit
    if (form.name.trim() === "" || !/\S+@\S+\.\S+/.test(form.email)) {
      setError({
        name: form.name.trim() === "",
        email: !/\S+@\S+\.\S+/.test(form.email),
      });
      return;
    }

    console.log("Form Submitted:", form);

    // show success
    setSuccess(true);

    // reset form
    setForm({
      name: "",
      email: "",
      message: "",
    });

    // hide success after 3s
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.ctfassets.net/0dkgxhks0leg/2W0e0i39df3qb9O05tsm8W/877bbaef4e6158eef162496144faf2f5/TF_20FW_22_20Dessert_20Collection_498.jpg)",
        }}
      />

      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Contact Us
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="block mb-1 text-white">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-full bg-gray-200 outline-none
              ${error.name ? "border-2 border-red-500" : ""}
            `}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block mb-1 text-white">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-full bg-gray-200 outline-none
              ${error.email ? "border-2 border-red-500" : ""}
            `}
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-4">
          <label className="block mb-1 text-white">Message:</label>
          <textarea
            name="message"
            placeholder="Enter Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-gray-200 outline-none resize-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full transition"
        >
          Send Message
        </button>
      </form>

      {/* ✅ SUCCESS MESSAGE */}
      {success && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl">
          ✅ Message Sent Successfully!
        </div>
      )}

      {/* ANIMATION */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
