"use client";

import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiCheckCircle, FiAlertCircle, FiSend } from 'react-icons/fi';
import styles from './EnquiryModal.module.css';

export default function EnquiryModal({
  show,
  handleClose,
  itemName = '',
  itemType = 'vehicle',
  formId = 9,
  slug = 'vehicle-booking',
  onSuccess = null
}) {
  const [formData, setFormData] = useState({
    vehicle_name: '',
    name: '',
    email: '',
    phone_number: '',
    _hp_email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionRef, setSubmissionRef] = useState('');

  const currentVehicleName = formData.vehicle_name || itemName || '';

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

    if (!formData.phone_number.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your phone number.');
      return;
    }

    if (!formData.email.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your email address.');
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
          vehicle_name: currentVehicleName.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone_number: formData.phone_number.trim(),
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
        setErrorMessage(res?.error || res?.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMessage(error?.message || 'Network error occurred. Please try again.');
    }
  };

  const handleModalClose = () => {
    setSubmitStatus(null);
    setErrorMessage('');
    setSubmissionRef('');
    setFormData({
      vehicle_name: '',
      name: '',
      email: '',
      phone_number: '',
      _hp_email: ''
    });
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      dialogClassName={styles.modalDialog}
      contentClassName={styles.modalContent}
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          Enquiry for {currentVehicleName || (itemType === 'vehicle' ? 'Vehicle Rental' : 'Tour Package')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {submitStatus === 'success' ? (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <FiCheckCircle className={styles.successIcon} />
            </div>
            {submissionRef && (
              <span className={styles.refBadge}>Booking Reference: {submissionRef}</span>
            )}
            <h4 className={styles.successTitle}>Thank You!</h4>
            <p className={styles.successText}>
              Your enquiry for <strong>{currentVehicleName}</strong> has been received. Our travel expert will contact you shortly to plan your trip.
            </p>
            <div className={styles.summaryDetailsBox}>
              <h5>Submitted Details</h5>
              <ul>
                {currentVehicleName && <li><strong>Vehicle:</strong> {currentVehicleName}</li>}
                <li><strong>Full Name:</strong> {formData.name}</li>
                <li><strong>Phone Number:</strong> {formData.phone_number}</li>
                <li><strong>Email Address:</strong> {formData.email}</li>
              </ul>
            </div>
            <button className={styles.successBtn} onClick={handleModalClose}>
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <p className={styles.infoText}>
              Please fill in your contact details below. We will customize this {itemType} service to suit your travel plans.
            </p>

            {submitStatus === 'error' && (
              <div className={styles.alertError} role="alert">
                <FiAlertCircle className={styles.alertIcon} />
                <span>{errorMessage}</span>
              </div>
            )}

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

            {/* Vehicle Name (Selected Vehicle) */}
            <Form.Group className="mb-3" controlId="enquiryVehicleName">
              <Form.Label className={styles.formLabel}>Selected Vehicle</Form.Label>
              <Form.Control
                type="text"
                name="vehicle_name"
                value={currentVehicleName}
                readOnly
                className={styles.disabledInput}
              />
            </Form.Group>

            {/* Full Name */}
            <Form.Group className="mb-3" controlId="enquiryName">
              <Form.Label className={styles.formLabel}>Full Name <span className="text-danger">*</span></Form.Label>
              <div className={styles.inputIconWrapper}>
                <FiUser className={styles.inputIcon} />
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
            </Form.Group>

            <div className="row">
              {/* Phone Number */}
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="enquiryPhone">
                  <Form.Label className={styles.formLabel}>Phone Number <span className="text-danger">*</span></Form.Label>
                  <div className={styles.inputIconWrapper}>
                    <FiPhone className={styles.inputIcon} />
                    <Form.Control
                      required
                      type="tel"
                      placeholder="10-digit mobile number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </div>
                </Form.Group>
              </div>

              {/* Email Address */}
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="enquiryEmail">
                  <Form.Label className={styles.formLabel}>Email Address <span className="text-danger">*</span></Form.Label>
                  <div className={styles.inputIconWrapper}>
                    <FiMail className={styles.inputIcon} />
                    <Form.Control
                      required
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span> Submitting Request...
                </>
              ) : (
                <>
                  <FiSend className={styles.sendIcon} /> Send Enquiry Request
                </>
              )}
            </button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
