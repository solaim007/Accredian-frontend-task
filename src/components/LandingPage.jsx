// src/LandingPage.js
import React, { useState } from 'react';
import { Container, Typography, Button, Modal, Box, TextField, Paper, Alert } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  yourName: Yup.string().required('Required'),
  yourEmail: Yup.string().email('Invalid email address').required('Required'),
  friendName: Yup.string().required('Required'),
  friendEmail: Yup.string().email('Invalid email address').required('Required'),
});

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    axios.post('https://accridian-backend-task.onrender.com/api/referrals', values)
      .then(response => {
        setSuccessMessage('Referral submitted successfully!');
        setSubmitting(false);
        handleClose();
      })
      .catch(error => {
        console.error('There was an error submitting the referral!', error);
        setErrorMessage('There was an error submitting the referral!');
        setSubmitting(false);
      });
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '40px', textAlign: 'center', marginTop: '50px', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h2" gutterBottom>Refer & Earn</Typography>
        <Typography variant="h5" gutterBottom>
          Refer a course and earn rewards!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginTop: '20px' }}>
          Refer Now
        </Button>
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Referral Form</Typography>
          <Formik
            initialValues={{ yourName: '', yourEmail: '', friendName: '', friendEmail: '', message: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field as={TextField} name="yourName" label="Your Name" fullWidth margin="normal" required />
                <ErrorMessage name="yourName" component="div" style={{ color: 'red' }} />
                <Field as={TextField} name="yourEmail" type="email" label="Your Email" fullWidth margin="normal" required />
                <ErrorMessage name="yourEmail" component="div" style={{ color: 'red' }} />
                <Field as={TextField} name="friendName" label="Friend's Name" fullWidth margin="normal" required />
                <ErrorMessage name="friendName" component="div" style={{ color: 'red' }} />
                <Field as={TextField} name="friendEmail" type="email" label="Friend's Email" fullWidth margin="normal" required />
                <ErrorMessage name="friendEmail" component="div" style={{ color: 'red' }} />
                <Field as={TextField} name="message" label="Message" multiline rows={4} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} style={{ marginTop: '20px' }}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {successMessage && <Alert severity="success" onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}
    </Container>
  );
};

export default LandingPage;
