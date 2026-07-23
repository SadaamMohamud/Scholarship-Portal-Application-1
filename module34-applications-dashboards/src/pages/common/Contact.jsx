import React, { useState } from "react";
import api from "../../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "SCHOLARSHIP_INQUIRY",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.fullName || !formData.email || !formData.message) {
      setError("Please fill in all blank spaces.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/contacts", formData);

      setSuccess("Your message has been sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        subject: "SCHOLARSHIP_INQUIRY",
        message: ""
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#031b33] via-[#0052cc] to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="text-blue-200 text-sm mb-3">
            Home / Contact
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold">
            Contact Us
          </h1>

          <p className="mt-5 max-w-2xl text-blue-100 text-lg">
            Have questions about scholarships, applications, or your account?
            Our support team is ready to help you.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-[#031b33] mb-2">
              Send Us A Message
            </h2>

            <p className="text-sm text-gray-500 mb-8">
              Fill the form below and our team will contact you.
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-5">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm mb-5">
                {success}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Subject
                </label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-600"
                >
                  <option value="SCHOLARSHIP_INQUIRY">Scholarship Inquiry</option>
                  <option value="APPLICATION_SUPPORT">Application Support</option>
                  <option value="TECHNICAL_ISSUE">Technical Issue</option>
                  <option value="FEEDBACK">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0052cc] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-[#031b33] mb-6">
                Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">
                    📍
                  </div>

                  <div className="ml-4">
                    <p className="text-xs text-gray-400">
                      Address
                    </p>

                    <p className="font-semibold">
                      Mogadishu, Somalia
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                    📞
                  </div>

                  <div className="ml-4">
                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="font-semibold">
                      +252 61 2345678
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl">
                    ✉️
                  </div>

                  <div className="ml-4">
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="font-semibold">
                      info@somscholarship.so
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-[#031b33] mb-5">
                Office Hours
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-3">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">8AM - 5PM</span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Saturday</span>
                  <span className="font-semibold">9AM - 1PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-500 font-semibold">
                    Closed
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;