/* eslint-disable no-unused-vars*/
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Form.css";

function SignUpForm() {
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
          initialValues={{ userName: "", email: "", password: "" }}
          validationSchema={signUp}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting((values = ""));
          }}
        >
          {({ errors, touched }) => (
            <Form action="POST" className="form_body">
              <Field name="userName" />
              {errors.userName && touched.userName ? (
                <div>{errors.userName}</div>
              ) : null}
              <Field name="email" />
              {errors.email && touched.email ? (
                <div className="emailDiv">{errors.email}</div>
              ) : null}
              <Field name="password" />
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
