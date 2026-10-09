"use client";

import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiCheckCircle, 
  FiAlertCircle,
  FiSend, 
  FiMapPin
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './BookNowForm.module.css';

export default function BookNowForm({
  formId = 8,
  slug = 'book-now',
  onSuccess = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone_number: '',
    whatsapp: '',
    description: '',
    _hp_email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionRef, setSubmissionRef] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam bot detection
    if (formData._hp_email) {
      return;
    }

    if (!formData.name.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!formData.phone_number.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your phone number.');
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
          email: formData.email.trim(),
          city: formData.city.trim(),
          phone_number: formData.phone_number.trim(),
          whatsapp: formData.whatsapp.trim(),
          description: formData.description.trim(),
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

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      city: '',
      phone_number: '',
      whatsapp: '',
      description: '',
      _hp_email: ''
    });
    setSubmitStatus(null);
    setErrorMessage('');
    setSubmissionRef('');
  };

  return (
    <section className={styles.bookingSection}>
      <div className={styles.container}>
        
        <div className={styles.bookingGrid}>
          
          {/* Form Left Side */}
          <div className={styles.formCard}>
            {submitStatus === 'success' ? (
              <div className={styles.successBox}>
                <div className={styles.successIconWrapper}>
                  <FiCheckCircle className={styles.successIcon} />
                </div>
                {submissionRef && (
                  <span className={styles.refBadge}>Booking Reference: {submissionRef}</span>
                )}
                <h3 className={styles.successTitle}>Booking Request Received!</h3>
                <p className={styles.successDesc}>
                  Thank you, <strong>{formData.name}</strong>. Your travel inquiry has been successfully received.
                </p>
                <div className={styles.summaryDetailsBox}>
                  <h4>Submitted Details</h4>
                  <ul>
                    <li><strong>Full Name:</strong> {formData.name}</li>
                    <li><strong>Email Address:</strong> {formData.email}</li>
                    <li><strong>Phone Number:</strong> {formData.phone_number}</li>
                    {formData.whatsapp && <li><strong>WhatsApp Number:</strong> {formData.whatsapp}</li>}
                    {formData.city && <li><strong>City / Location:</strong> {formData.city}</li>}
                    {formData.description && <li><strong>Requirements:</strong> {formData.description}</li>}
                  </ul>
                </div>
                <p className={styles.calloutText}>
                  Our senior travel representative will review your request and call/WhatsApp you within 30 minutes with the complete itinerary & lowest pricing quote!
                </p>
                <button type="button" className={styles.newBookingBtn} onClick={resetForm}>
                  Submit Another Booking Request
                </button>
              </div>
            ) : (
              <form 
                className={styles.form} 
                onSubmit={handleSubmit}
              >
                {/* Honeypot field for bot spam detection */}
                <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="_hp_email">Please leave this field empty</label>
                  <input
                    type="text"
                    id="_hp_email"
                    name="_hp_email"
                    value={formData._hp_email}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Book Your Holiday Package</h2>
                  <p className={styles.formSub}>Fill out your contact details below for a customized quote & instant confirmation.</p>
                </div>

                {submitStatus === 'error' && (
                  <div className={styles.alertError} role="alert">
                    <FiAlertCircle className={styles.alertIcon} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Contact & Traveler Details */}
                <div className={styles.formGroupSection}>
                  <h3 className={styles.sectionHeader}>
                    Contact & Traveler Details
                  </h3>

                  <div className={styles.rowTwo}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                      <div className={styles.iconInputWrapper}>
                        <FiUser className={styles.inputIcon} />
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="Your complete name" 
                          value={formData.name} 
                          onChange={handleChange}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Email Address <span className={styles.req}>*</span></label>
                      <div className={styles.iconInputWrapper}>
                        <FiMail className={styles.inputIcon} />
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="name@example.com" 
                          value={formData.email} 
                          onChange={handleChange}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.rowThree}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Phone Number <span className={styles.req}>*</span></label>
                      <div className={styles.iconInputWrapper}>
                        <FiPhone className={styles.inputIcon} />
                        <input 
                          type="tel" 
                          name="phone_number" 
                          placeholder="10-digit mobile number" 
                          value={formData.phone_number} 
                          onChange={handleChange}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>WhatsApp Number</label>
                      <div className={styles.iconInputWrapper}>
                        <FiPhone className={styles.inputIcon} />
                        <input 
                          type="tel" 
                          name="whatsapp" 
                          placeholder="WhatsApp number" 
                          value={formData.whatsapp} 
                          onChange={handleChange}
                          className={styles.input}
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Your City / Location</label>
                      <div className={styles.iconInputWrapper}>
                        <FiMapPin className={styles.inputIcon} />
                        <input 
                          type="text" 
                          name="city" 
                          placeholder="e.g. Kolkata, Delhi" 
                          value={formData.city} 
                          onChange={handleChange}
                          className={styles.input}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Special Requirements or Customization Notes</label>
                    <div className={styles.iconInputWrapper}>
                      <FiMessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} />
                      <textarea 
                        name="description" 
                        rows="3"
                        placeholder="Tell us about special places you want to visit, dietary choices, extra beds, or flight details..."
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.textarea}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span> Submitting Request...
                    </>
                  ) : (
                    <>
                      <FiSend className={styles.sendIcon} /> Confirm & Submit Booking Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Sidebar Live Summary */}
          <div className={styles.sidebar}>
            
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Summary</h3>
              
              <div className={styles.summaryBody}>
                <div className={styles.summaryRow}>
                  <span className={styles.sumLabel}>Full Name</span>
                  <span className={styles.sumVal}>{formData.name || 'Not entered'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.sumLabel}>Phone</span>
                  <span className={styles.sumVal}>{formData.phone_number || 'Not entered'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.sumLabel}>WhatsApp</span>
                  <span className={styles.sumVal}>{formData.whatsapp || 'Not entered'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.sumLabel}>Email</span>
                  <span className={styles.sumVal}>{formData.email || 'Not entered'}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.sumLabel}>City</span>
                  <span className={styles.sumVal}>{formData.city || 'Not entered'}</span>
                </div>
              </div>

              <div className={styles.summaryFooter}>
                <p className={styles.pricingNote}>
                  ⚡ <strong>Quick Response:</strong> Our travel expert will call & WhatsApp you with customized pricing options.
                </p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <h4 className={styles.trustTitle}>Contact Jagannath Holidays</h4>
              
              <div className={styles.trustItem}>
                <FiPhone className={styles.trustIcon} />
                <div>
                  <h5>Call Us</h5>
                  <a href="tel:+919583837770" className={styles.contactLink}>
                    +91 9583837770
                  </a>
                </div>
              </div>

              <div className={styles.trustItem}>
                <FiMail className={styles.trustIcon} />
                <div>
                  <h5>Email</h5>
                  <a href="mailto:info@jagannathholidays.com" className={styles.contactLink}>
                    info@jagannathholidays.com
                  </a>
                </div>
              </div>

              <div className={styles.trustItem}>
                <FaWhatsapp className={styles.trustIcon} />
                <div>
                  <h5>WhatsApp</h5>
                  <a 
                    href="https://wa.me/919583837770" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.contactLink}
                  >
                    +91 9583837770 (Chat Now)
                  </a>
                </div>
              </div>

              <div className={styles.trustItem}>
                <FiMapPin className={styles.trustIcon} />
                <div>
                  <h5>Visit Us</h5>
                  <p>
                    Rasulgarh, Bhubaneswar, 751025, Odisha, India
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
