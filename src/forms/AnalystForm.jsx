import React, { useState } from "react";
import "./formStyles.css";

export default function AnalystForm({ changeAuthorization,setData }) {
  const [formData, setFormData] = useState({
    code: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (
      formData.code &&
      formData.firstName &&
      formData.lastName &&
      formData.email
    ) {
      setData(formData)
      changeAuthorization();
    } else {
      alert("All fields are required");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label>
          <p>Code:</p>

          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
      </div>
      <div>
        <label>
          <p>First Name:</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
      </div>
      <div>
        <label>
          <p>Last Name:</p>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
      </div>
      <div>
        <label>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </label>
      </div>
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
}
