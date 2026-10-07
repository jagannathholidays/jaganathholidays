"use client";

import { useState, useEffect } from 'react';
import { FiUser, FiSmartphone, FiCalendar, FiUsers, FiMessageSquare, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import styles from './DestinationDetailsContent.module.css';
import AnimatedButton from './AnimatedButton';

export default function PlanJourneyForm({ 
  defaultPackage = '',
  formId = 7,
  slug = 'booking-form',
  onSuccess = null
}) {
  const [isStickyForm, setIsStickyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    arrival: '',
    departure: '',
    persons: '1',
    children: '0',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionRef, setSubmissionRef] = useState('');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Only apply on screens wider than 992px (desktop)
      if (window.innerWidth <= 992) {
        setIsStickyForm(false);
        return;
      }

      const currentScrollY = window.scrollY;
      const threshold = 600;

      if (currentScrollY > threshold) {
        if (currentScrollY < lastScrollY) {
          setIsStickyForm(true);
        } else {
          setIsStickyForm(false);
        }
      } else {
        setIsStickyForm(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your mobile number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch(`/api/forms/${formId}/${slug}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          phone_number: formData.phone.trim(),
          service: defaultPackage || 'Plan Journey',
          package: defaultPackage || 'Plan Journey',
          date: formData.arrival,
          travel_date: formData.arrival,
          arrival_date: formData.arrival,
          departure_date: formData.departure,
          passengers: formData.persons || '1',
          persons: formData.persons || '1',
          children: formData.children || '0',
          message: formData.message.trim(),
        }),
      });

      const res = await response.json().catch(() => null);

      setIsSubmitting(false);

      if (res && res.success) {
        setSubmitStatus('success');
        setSubmissionRef(res.submission_no || '');
        if (typeof onSuccess === 'function') {
          onSuccess(res);
        }
      } else {
        setSubmitStatus('error');
        setErrorMessage(res?.error || res?.message || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage(error?.message || 'Network error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      arrival: '',
      departure: '',
      persons: '1',
      children: '0',
      message: ''
    });
    setSubmitStatus(null);
    setErrorMessage('');
    setSubmissionRef('');
  };

  return (
    <div className={`${styles.formBox} ${isStickyForm ? styles.stickyForm : ''}`}>
      <h3 className={styles.sidebarTitle}>Plan Your Journey</h3>
      
      {submitStatus === 'success' ? (
        <div className={styles.successBox}>
          <div className={styles.successIconWrapper}>
            <FiCheckCircle className={styles.successIcon} />
          </div>
          <h4 className={styles.successTitle}>Inquiry Sent!</h4>
          {submissionRef && (
            <div className={styles.refBadge}>
              Ref No: <span className={styles.refHighlight}>{submissionRef}</span>
            </div>
          )}
          <p className={styles.successText}>
            Thank you, <strong>{formData.name}</strong>! We have received your journey inquiry for <strong>{defaultPackage || 'your trip'}</strong>. Our travel experts will get in touch with you shortly.
          </p>
          <button type="button" className={styles.resetBtn} onClick={handleReset}>
            Plan Another Journey
          </button>
        </div>
      ) : (
        <form className={styles.bookingForm} onSubmit={handleSubmit}>
          {submitStatus === 'error' && (
            <div className={styles.alertError} role="alert">
              <FiAlertCircle className={styles.alertIcon} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className={styles.formGroup}>
            <label><FiUser className={styles.inputIcon} /> Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name" 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label><FiSmartphone className={styles.inputIcon} /> Mobile *</label>
            <div className={styles.phoneInput}>
              <div className={styles.countryCode}>
                <span>🇮🇳</span> +91
              </div>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number" 
                required 
              />
            </div>
          </div>

          {/* Arrival & Departure side-by-side */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label><FiCalendar className={styles.inputIcon} /> Arrival</label>
              <input 
                type="date" 
                name="arrival"
                value={formData.arrival}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label><FiCalendar className={styles.inputIcon} /> Departure</label>
              <input 
                type="date" 
                name="departure"
                value={formData.departure}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* No. of Persons & Children side-by-side */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label><FiUsers className={styles.inputIcon} /> Persons</label>
              <input 
                type="number" 
                min="1" 
                name="persons"
                value={formData.persons}
                onChange={handleChange}
                placeholder="Adults" 
              />
            </div>
            <div className={styles.formGroup}>
              <label><FiUsers className={styles.inputIcon} /> Children</label>
              <input 
                type="number" 
                min="0" 
                name="children"
                value={formData.children}
                onChange={handleChange}
                placeholder="Children" 
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label><FiMessageSquare className={styles.inputIcon} /> Message</label>
            <textarea 
              rows="3" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your travel preferences..."
            />
          </div>

          <AnimatedButton className={styles.submitBtn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span> Sending Inquiry...
              </>
            ) : (
              <>
                <FiSend className={styles.sendIcon}/> Submit Inquiry
              </>
            )}
          </AnimatedButton>
        </form>
      )}
    </div>
  );
}
