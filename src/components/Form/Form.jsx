/* eslint-disable no-unused-vars*/
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBC_MYwrZikd1-vTuXzbLBmP5br-gEuzDc",
  authDomain: "fir-project-3-68794.firebaseapp.com",
  projectId: "fir-project-3-68794",
});

const auth = getAuth(app);

function SignUpForm() {
  const initialValues = { userName: "", email: "", password: "" };

  const signUp = Yup.object().shape({
    userName: Yup.string(),
    email: Yup.string().email("Invalid Email").required(),
    password: Yup.string().min(4, "Too short!").max(8, "Too long!").required(),
  });

  return (
    <>
      <div className="form_container">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signUp}
          onSubmit={(values, { setSubmitting, resetForm }) => {
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
          }}
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
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignUpForm;
