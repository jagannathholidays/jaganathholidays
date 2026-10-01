"use client";

import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiShield 
} from 'react-icons/fi';
import { submitCmsForm } from '@/lib/formService';
import styles from './ContactForm.module.css';

/**
 * Professional Reusable Contact Form Component
 * Default configured for Form ID: 6 ('contact-us')
 * Fields: name, email, phone, message
 */
export default function ContactForm({ 
  formId = 6, 
  slug = 'contact-us',
  title = "Send Us a Message",
  subtitle = "Have questions about tour packages or custom itineraries? Send us an inquiry and our travel experts will get back to you within 2 hours.",
  onSuccess = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionRef, setSubmissionRef] = useState('');

  const validate = () => {
    const errs = {};
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    const cleanEmail = formData.email.trim();
    const cleanMsg = formData.message.trim();

    if (!cleanName) {
      errs.name = 'Please enter your full name.';
    } else if (cleanName.length < 3) {
      errs.name = 'Name must be at least 3 characters long.';
    }

    if (!cleanPhone) {
      errs.phone = 'Please enter your 10-digit mobile number.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!cleanMsg) {
      errs.message = 'Please let us know how we can help you.';
    } else if (cleanMsg.length < 5) {
      errs.message = 'Message must be at least 5 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const res = await submitCmsForm({
      formId,
      slug,
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitStatus('success');
      setSubmissionRef(res.submission_no || '');
      if (typeof onSuccess === 'function') {
        onSuccess(res);
      }
    } else {
      setSubmitStatus('error');
      setErrorMessage(res.error || 'Failed to submit. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
    setSubmissionRef('');
    setErrorMessage('');
  };

  return (
    <div className={styles.formCard}>
      {submitStatus === 'success' ? (
        <div className={styles.successCard}>
          <div className={styles.successIconWrapper}>
            <FiCheckCircle />
          </div>
          {submissionRef && (
            <div className={styles.refBadge}>
              Inquiry Reference: <span className={styles.refHighlight}>{submissionRef}</span>
            </div>
          )}
          <h3 className={styles.successTitle}>Thank You! We Received Your Message</h3>
          <p className={styles.successDesc}>
            Our holiday planner will review your details and reach out to you within 2 hours with customized tour recommendations.
          </p>
          <div className={styles.submittedSummary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Name:</span>
              <span className={styles.summaryVal}>{formData.name}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Phone:</span>
              <span className={styles.summaryVal}>+91 {formData.phone}</span>
            </div>
            {formData.email && (
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Email:</span>
                <span className={styles.summaryVal}>{formData.email}</span>
              </div>
            )}
          </div>
          <button type="button" onClick={handleReset} className={styles.resetBtn}>
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{title}</h2>
            <p className={styles.formSubtitle}>{subtitle}</p>
          </div>

          {submitStatus === 'error' && (
            <div className={styles.alertError} role="alert">
              <FiAlertCircle className={styles.alertIcon} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className={styles.formBody}>
            {/* Name field */}
            <div className={styles.inputGroup}>
              <label htmlFor="contact-name" className={styles.label}>
                <span>Your Full Name <span className={styles.required}>*</span></span>
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Subham Baral"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  required
                />
                <FiUser className={styles.inputIcon} />
              </div>
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            {/* Row: Phone & Email */}
            <div className={styles.formRow}>
              {/* Phone field */}
              <div className={styles.inputGroup}>
                <label htmlFor="contact-phone" className={styles.label}>
                  <span>Phone Number <span className={styles.required}>*</span></span>
                </label>
                <div className={`${styles.inputWrapper} ${styles.phoneWrapper}`}>
                  <span className={styles.countryCode}>🇮🇳 +91</span>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9583837770"
                    maxLength={15}
                    className={`${styles.input} ${styles.phoneInput} ${errors.phone ? styles.inputError : ''}`}
                    required
                  />
                  <FiPhone className={styles.inputIcon} style={{ left: '56px' }} />
                </div>
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              {/* Email field */}
              <div className={styles.inputGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  <span>Email Address</span>
                  <span className={styles.optional}>Optional</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                  <FiMail className={styles.inputIcon} />
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
            </div>

            {/* Message field */}
            <div className={styles.inputGroup}>
              <div className={styles.label}>
                <span>Your Travel Requirements or Message <span className={styles.required}>*</span></span>
              </div>
              <div className={styles.textareaWrapper}>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={500}
                  placeholder="Tell us about the destinations you'd like to visit, dates, number of travelers, or any custom requirements..."
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  required
                />
                <FiMessageSquare className={styles.textareaIcon} />
              </div>
              <div className={styles.textareaFooter}>
                {errors.message ? (
                  <span className={styles.errorText}>{errors.message}</span>
                ) : (
                  <span>Minimum 5 characters</span>
                )}
                <span className={styles.charCount}>{formData.message.length} / 500</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Sending Inquiry...</span>
                </>
              ) : (
                <>
                  <span>Send A Message</span>
                  <FiSend className={styles.submitIcon} />
                </>
              )}
            </button>

            <div className={styles.securityNote}>
              <FiShield />
              <span>Your personal details are 100% secure & never shared with third parties.</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
