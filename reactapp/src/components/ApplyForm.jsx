import React, { useState } from 'react';
import { BASE_URL } from '../api/api';
import { color, font, radius, shadow, inputStyle, labelStyle, primaryButton, pageShell, fontImports } from './theme';

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: '',
    bikeNumber: '',
    age: '',
    phoneNumber: '',
    drivingLicenseNumber: '',
    address: '',
    emergencyContact: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.bikeNumber) newErrors.bikeNumber = 'Bike Number is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const payload = {
        name: formData.name,
        bikeNumber: formData.bikeNumber,
        age: Number(formData.age),
        phoneNumber: formData.phoneNumber.trim(),
        drivingLicenseNumber: formData.drivingLicenseNumber || null,
        address: formData.address || null,
        emergencyContact: formData.emergencyContact || null
      };

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${BASE_URL}/addBiketaxi`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          setSuccess(true);
        } else {
          const errText = await res.text();
          if (res.status === 500) {
            alert('Failed to submit: This bike number might already be registered, or there is a server error.');
          } else {
            alert('Failed to submit: ' + errText);
          }
        }
      } catch (err) {
        console.error(err);
        alert('Network error occurred. ' + err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const styles = {
    page: { ...pageShell, padding: '48px 20px', display: 'flex', justifyContent: 'center' },
    card: {
      width: '100%',
      maxWidth: '560px',
      backgroundColor: color.surface,
      border: `1px solid ${color.border}`,
      borderRadius: radius.lg,
      boxShadow: shadow.card,
      padding: '36px',
    },
    heading: {
      fontFamily: font.display,
      fontSize: '1.45rem',
      fontWeight: 600,
      margin: '0 0 6px 0',
      color: color.ink,
    },
    sub: {
      fontSize: '0.85rem',
      color: color.inkMuted,
      margin: '0 0 24px 0',
    },
    success: {
      backgroundColor: '#E5F5EC',
      color: '#0F6E3D',
      border: '1px solid #BEE6CE',
      borderRadius: radius.sm,
      padding: '14px 16px',
      fontSize: '0.88rem',
      fontWeight: 500,
      marginBottom: '20px',
    },
    field: { display: 'flex', flexDirection: 'column', marginBottom: '16px' },
    error: { color: color.danger, fontSize: '0.78rem', marginTop: '4px', fontWeight: 500 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  };

  return (
    <div style={styles.page}>
      <style>{fontImports}</style>
      <div style={styles.card}>
        <h2 style={styles.heading}>Apply to Join</h2>
        <p style={styles.sub}>Provide your details to join the fleet. Applications are reviewed by our operations team.</p>

        {success && (
          <div style={styles.success}>
            Your application has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={labelStyle} htmlFor="name">Name:</label>
            <input 
              style={inputStyle} 
              type="text" 
              id="name" 
              name="name" 
              placeholder="e.g. John Doe"
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={labelStyle} htmlFor="bikeNumber">Bike Number:</label>
              <input 
                style={inputStyle} 
                type="text" 
                id="bikeNumber" 
                name="bikeNumber" 
                placeholder="e.g. MH12AB1234"
                value={formData.bikeNumber} 
                onChange={handleChange} 
              />
              {errors.bikeNumber && <span style={styles.error}>{errors.bikeNumber}</span>}
            </div>
            <div style={styles.field}>
              <label style={labelStyle} htmlFor="age">Age:</label>
              <input 
                style={inputStyle} 
                type="number" 
                id="age" 
                name="age" 
                placeholder="e.g. 25"
                value={formData.age} 
                onChange={handleChange} 
              />
              {errors.age && <span style={styles.error}>{errors.age}</span>}
            </div>
          </div>

          <div style={styles.field}>
            <label style={labelStyle} htmlFor="phoneNumber">Phone Number:</label>
            <input 
              style={inputStyle} 
              type="text" 
              id="phoneNumber" 
              name="phoneNumber" 
              placeholder="10 digit mobile number"
              value={formData.phoneNumber} 
              onChange={handleChange} 
            />
            {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}
          </div>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={labelStyle} htmlFor="drivingLicenseNumber">Driving License (Optional):</label>
              <input 
                style={inputStyle} 
                type="text" 
                id="drivingLicenseNumber" 
                name="drivingLicenseNumber" 
                placeholder="e.g. DL-12345678"
                value={formData.drivingLicenseNumber} 
                onChange={handleChange} 
              />
            </div>
            <div style={styles.field}>
              <label style={labelStyle} htmlFor="emergencyContact">Emergency Contact (Optional):</label>
              <input 
                style={inputStyle} 
                type="text" 
                id="emergencyContact" 
                name="emergencyContact" 
                placeholder="Contact number"
                value={formData.emergencyContact} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <button 
            style={{ ...primaryButton, width: '100%', padding: '12px', marginTop: '10px' }} 
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyForm;
