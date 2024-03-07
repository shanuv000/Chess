import React, { useState } from "react";

function WhatsAppSender() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank").focus();

    // Reset the form fields for the next message
    setPhoneNumber("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="phoneNumber">
          Phone Number (International Format):
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send WhatsApp Message</button>
    </form>
  );
}

export default WhatsAppSender;
