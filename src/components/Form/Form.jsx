/* eslint-disable no-unused-vars*/
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { db } from "./firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const app = initializeApp({
  apiKey: "AIzaSyBC_MYwrZikd1-vTuXzbLBmP5br-gEuzDc",
  authDomain: "fir-project-3-68794.firebaseapp.com",
  projectId: "fir-project-3-68794",
});

const SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

const db = getFirestore(app);

const auth = getAuth(app);
// const axios = require("axios");

function SignUpForm() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const initialValues = { userName: "", email: "", password: "" };

  const signUp = Yup.object().shape({
    userName: Yup.string(),
    email: Yup.string().email("Invalid Email").required(),
    password: Yup.string().min(4, "Too short!").max(8, "Too long!").required(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    axios({
      method: "post",
      url: "https://www.google.com/",
      headers: { "content-type": "application/json" },
      data: {
        firstName: "Fred",
        lastName: "Flintstone",
      },
    });

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: values.userName,
        });
        console.log("user created successfully!");
        setSubmitting(false);
        resetForm({ values: initialValues });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setSubmitting(false);
        resetForm({ values: initialValues });
      });
    if (!captchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), { ...values, captchaValue });
      console.log("Message sent!", values);
      resetForm();
      setCaptchaValue(null); // Reset the reCAPTCHA value
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="form_container">
        <h2>Sign Up</h2>
        {/* <h2>Sign in</h2> */}
        <Formik
          initialValues={initialValues}
          validationSchema={signUp}
          onSubmit={handleSubmit}
          // onSubmit={(values, { setSubmitting, resetForm }) => {
          //   createUserWithEmailAndPassword(auth, values.email, values.password)
          //     .then((userCredential) => {
          //       updateProfile(userCredential.user, {
          //         displayName: values.userName,
          //       });
          //       console.log("user created successfully!");
          //       setSubmitting(false);
          //       resetForm({ values: initialValues });
          //     })
          //     .catch((error) => {
          //       console.error("Error creating user:", error);
          //       setSubmitting(false);
          //       resetForm({ values: initialValues });
          //     });
          // }}
        >
          {({ errors, touched }) => (
            <Form className="form_body">
              <Field name="userName" type="text" />
              {errors.userName && touched.userName ? (
                <div>{errors.userName}</div>
              ) : null}
              <Field name="email" type="email" />
              {errors.email && touched.email ? (
                <div className="emailDiv">{errors.email}</div>
              ) : null}
              <Field name="password" type="password" />
              {errors.password && touched.password ? (
                <div className="passDiv">{errors.password}</div>
              ) : null}
              <ReCAPTCHA
                className="reCaptcha"
                sitekey={SITE_KEY} // Replace with your reCAPTCHA site key
                onChange={(value) => setCaptchaValue(value)}
              />
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignUpForm;
