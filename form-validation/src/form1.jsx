import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', dob: '', mobile: '', gender: '', role: '', zip: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    const validations = {
      name: value ? '' : 'Name is required.',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Valid email is required.',
      password: value.length >= 6 ? '' : 'Password must be at least 6 characters.',
      dob: value ? '' : 'Date of birth is required.',
      mobile: /^[0-9]{10}$/.test(value) ? '' : 'Valid mobile number is required.',
      gender: value ? '' : 'Gender is required.',
      role: value ? '' : 'Role is required.',
      zip: /^\d{6}$/.test(value) ? '' : 'Valid zip code is required.'
    };
    return validations[name] || '';
  };

  const validate = () => {
    const tempErrors = Object.fromEntries(Object.entries(formData).map(([key, value]) => [key, validateField(key, value)]));
    setErrors(tempErrors);
    return Object.values(tempErrors).every(error => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
      setFormData({ name: '', email: '', password: '', dob: '', mobile: '', gender: '', role: '', zip: '' });
      setErrors({});
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '20px auto', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>

      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            {key === 'gender' ? (
              <select name={key} value={value} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type={key === 'password' ? 'password' : (key === 'dob' ? 'date' : 'text')}
                name={key}
                value={value}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            )}
            {errors[key] && <span style={{ color: 'red', fontSize: '12px' }}>{errors[key]}</span>}
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
