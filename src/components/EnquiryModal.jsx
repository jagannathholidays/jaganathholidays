"use client";

import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FiUser, FiMail, FiPhone, FiCalendar, FiUsers, FiMessageSquare, FiCheckCircle, FiSend } from 'react-icons/fi';
import styles from './EnquiryModal.module.css';

export default function EnquiryModal({ show, handleClose, itemName = '', itemType = 'vehicle' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    passengers: '1',
    message: ''
  });

  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // Simulate API request submission
    setIsSubmitted(true);
    setValidated(false);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      passengers: '1',
      message: ''
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
          Enquiry for {itemName || (itemType === 'vehicle' ? 'Vehicle Rental' : 'Tour Package')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {isSubmitted ? (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <FiCheckCircle className={styles.successIcon} />
            </div>
            <h4 className={styles.successTitle}>Thank You!</h4>
            <p className={styles.successText}>
              Your enquiry for <strong>{itemName}</strong> has been received. Our travel expert will contact you shortly to plan your trip.
            </p>
            <button className={styles.successBtn} onClick={handleModalClose}>
              Close Window
            </button>
          </div>
        ) : (
          <Form noValidate validated={validated} onSubmit={handleSubmit} className={styles.formContainer}>
            <p className={styles.infoText}>
              Please fill in your travel requirements. We will customize this {itemType} service to suit your travel plans.
            </p>

            {/* Hidden field or reference */}
            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Selected Service</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                disabled
                className={styles.disabledInput}
              />
            </Form.Group>

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
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="enquiryPhone">
                  <Form.Label className={styles.formLabel}>Phone Number <span className="text-danger">*</span></Form.Label>
                  <div className={styles.inputIconWrapper}>
                    <FiPhone className={styles.inputIcon} />
                    <Form.Control
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid 10-digit phone number.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </div>
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
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="enquiryDate">
                  <Form.Label className={styles.formLabel}>Date of Travel <span className="text-danger">*</span></Form.Label>
                  <div className={styles.inputIconWrapper}>
                    <FiCalendar className={styles.inputIcon} />
                    <Form.Control
                      required
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a travel date.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="enquiryPassengers">
                  <Form.Label className={styles.formLabel}>Passengers <span className="text-danger">*</span></Form.Label>
                  <div className={styles.inputIconWrapper}>
                    <FiUsers className={styles.inputIcon} />
                    <Form.Control
                      required
                      type="number"
                      min="1"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter at least 1 passenger.
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4" controlId="enquiryMessage">
              <Form.Label className={styles.formLabel}>Special Requirements (Optional)</Form.Label>
              <div className={styles.inputIconWrapper}>
                <FiMessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} />
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us about your itinerary, preferred stops, etc."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.formInput} ${styles.formTextarea}`}
                />
              </div>
            </Form.Group>

            <button type="submit" className={styles.submitBtn}>
              <FiSend className={styles.sendIcon} /> Send Enquiry Request
            </button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
