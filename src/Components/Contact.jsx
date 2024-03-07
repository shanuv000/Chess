import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add additional validation if needed

      const docRef = await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again later.");
    }
  };

  const handleWhatsAppClick = () => {
    const phone = "7903778038"; // Replace with the recipient's phone number
    const message = `Hi, I'm interested in your services. Can we chat?`;

    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappLink;
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formName"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                pattern="[A-Za-z\s]{2,}"
                title="Please enter a valid name (at least 2 characters, letters only)"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="formEmail"
                placeholder="Your Email"
                name="email"
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formMessage" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="formMessage"
                rows={4}
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            {/* Additional button for WhatsApp */}
            <button
              type="button"
              className="btn btn-success ms-2"
              onClick={handleWhatsAppClick}
            >
              Contact via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
