/* eslint-disable no-unused-vars */
// src/ContactForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../../../src/Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import "./ContactForm.css";

const SITE_KEY = "6Lc1GloqAAAAAOeI9KgR_FBaTYinyq-fDLVQH1dA";
const SECRET_KEY = "6Lc1GloqAAAAAPa8IvsWXQTnNm6In3VR78W3H2A4";

const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    message: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "messages"), values);
      console.log("Message sent!", values);
      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <Field as="textarea" id="message" name="message" />
            <ErrorMessage name="message" component="div" className="error" />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
