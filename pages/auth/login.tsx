import Head from "next/head";
import Link from "next/link";

import { TextField, InputAdornment, Button } from "@material-ui/core";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  ReaderOutline,
  EyeOutline,
  EyeOffOutline,
  LockClosedOutline,
} from "react-ionicons";

export default function LoginPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setVisibilityState] = useState<boolean>(false);
  return (
    <>
      {" "}
      <Head>
        {" "}
        <title>Login - HRRS | Housing & Hostel</title>{" "}
      </Head>{" "}
      <section className="AuthPage Login">
        {" "}
        <div className="content_detail">
          {" "}
          <h3 className="main_txt">Hello, Student</h3>{" "}
          <p className="txt">
            {" "}
            Welcome Nnamdi Azikiwe University Students Hostel Portal{" "}
          </p>{" "}
          <p className="txt">
            {" "}
            Please fill in the details to create an account or proceed to login
            if you are returning student{" "}
          </p>{" "}
          <Link href="/auth/register">
            {" "}
            <a className="btn_link">Create Account</a>{" "}
          </Link>{" "}
        </div>{" "}
        <div className="content_form">
          {" "}
          <h3 className="main_txt">Login Portal</h3>{" "}
          <form>
            {" "}
            <div className="inputBox">
              {" "}
              <label htmlFor="registration_number">
                Registration Number
              </label>{" "}
              <TextField
                variant="outlined"
                type="text"
                inputProps={{
                  id: "registration_number",
                }}
                required
                placeholder="Enter your registration number."
                value={registrationNumber}
                onChange={(e) => {
                  setRegistrationNumber(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="icon">
                      {" "}
                      <ReaderOutline
                        color={"#00000"}
                        height="20px"
                        width="20px"
                      />{" "}
                    </InputAdornment>
                  ),
                }}
              />{" "}
            </div>{" "}
            <div className="inputBox">
              {" "}
              <label htmlFor="password">Password</label>{" "}
              <TextField
                variant="outlined"
                type="password"
                inputProps={{
                  id: "password",
                }}
                required
                placeholder="Enter your password."
                helperText="Password should be at least six characters long"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="icon">
                      {" "}
                      <LockClosedOutline
                        color={"#00000"}
                        height="20px"
                        width="20px"
                      />{" "}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {" "}
                      {!isVisible ? (
                        <motion.div
                          className="icon_btn"
                          onClick={() => {
                            setVisibilityState(!isVisible);
                          }}
                        >
                          {" "}
                          <EyeOutline
                            color={"#fff"}
                            title={"see password"}
                            height="20px"
                            width="20px"
                          />{" "}
                        </motion.div>
                      ) : (
                        <motion.div
                          className="icon_btn"
                          onClick={() => {
                            setVisibilityState(!isVisible);
                          }}
                        >
                          {" "}
                          <EyeOffOutline
                            color={"#fff"}
                            title={"hide password"}
                            height="20px"
                            width="20px"
                          />{" "}
                        </motion.div>
                      )}
                    </InputAdornment>
                  ),
                }}
              />{" "}
            </div>{" "}
            <div className="action">
              {" "}
              <Button type="submit" className="submit_btn">
                {" "}
                Log In{" "}
              </Button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}
