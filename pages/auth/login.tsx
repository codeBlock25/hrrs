import Head from "next/head";
import Link from "next/link";

import { TextField, InputAdornment, Button } from "@material-ui/core";

import { FormEvent, useState } from "react";

import { motion } from "framer-motion";

import {
  ReaderOutline,
  EyeOutline,
  EyeOffOutline,
  LockClosedOutline,
} from "react-ionicons";
import { toast } from "react-toastify";
import axios, { AxiosResponse } from "axios";
import { server_url } from "../../config";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

export default function LoginPage() {
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setVisibilityState] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoading) return;
      setLoading(true);
      await axios
        .get(
          `${server_url}/auth/login?registrationNumber=${registrationNumber}&password=${password}`
        )
        .then(({ data: { token } }: AxiosResponse<{ token: string }>) => {
          localStorage.setItem("token", token);
          toast.success("Welcome Back!");
          push("/panel/dashboard");
        })
        .catch((error) => {
          console.log({ error });
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      toast.error("Network Error");
    }
  };
  return (
    <>
      <Head>
        <title>Login - HRRS | Housing & Hostel</title>
      </Head>
      <section className="AuthPage Login">
        <div className="content_detail">
          <h3 className="main_txt">Hello, Student</h3>
          <p className="txt">
            Welcome Nnamdi Azikiwe University Students Hostel Portal
          </p>
          <p className="txt">
            Please fill in the details to create an account or proceed to login
            if you are returning student
          </p>
          <Link href="/auth/register">
            <a className="btn_link">Create Account</a>
          </Link>
        </div>
        <div className="content_form">
          <h3 className="main_txt">Login Portal</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <label htmlFor="registration_number">Registration Number</label>
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
                      <ReaderOutline
                        color={"#00000"}
                        height="20px"
                        width="20px"
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="password">Password</label>
              <TextField
                variant="outlined"
                type={isVisible ? "text" : "password"}
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
                      <LockClosedOutline
                        color={"#00000"}
                        height="20px"
                        width="20px"
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {!isVisible ? (
                        <motion.div
                          className="icon_btn"
                          onClick={() => {
                            setVisibilityState(!isVisible);
                          }}
                        >
                          <EyeOutline
                            color={"#fff"}
                            title={"see password"}
                            height="20px"
                            width="20px"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          className="icon_btn"
                          onClick={() => {
                            setVisibilityState(!isVisible);
                          }}
                        >
                          <EyeOffOutline
                            color={"#fff"}
                            title={"hide password"}
                            height="20px"
                            width="20px"
                          />
                        </motion.div>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="action">
              <Button type="submit" className="submit_btn">
                Log In
                {isLoading && <ClipLoader size={40} color="#f45e14" />}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
