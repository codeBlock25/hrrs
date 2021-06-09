import Head from "next/head";
import Link from "next/link";
import {
  TextField,
  InputAdornment,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  PersonOutline,
  ReaderOutline,
  MailOutline,
  PhonePortraitOutline,
  EyeOutline,
  EyeOffOutline,
  LockClosedOutline,
} from "react-ionicons";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { server_url } from "../../config";

export enum Gender {
  male,
  female,
}

export default function RegisterPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<Gender>(Gender.male);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isVisible, setVisibilityState] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoading) return;
      await axios
        .post(`${server_url}/auth/register`, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          gender,
          registrationNumber,
          phone_number: phoneNumber,
        })
        .then(() => {
          toast.success("kjh");
        })
        .catch((error) => {
          console.log({ error });
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Network");
    }
  };
  return (
    <>
      <Head>
        <title>Register - HRRS | Housing & Hostel</title>
      </Head>
      <section className="AuthPage Register">
        <div className="content_form">
          <h3 className="main_txt">Create a Student Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <label htmlFor="first_name">First Name</label>
              <TextField
                variant="outlined"
                type="text"
                autoComplete="given-name"
                inputProps={{ id: "first_name" }}
                required
                placeholder="Enter your first name."
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="icon">
                      <PersonOutline
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
              <label htmlFor="last_name">Last Name</label>
              <TextField
                variant="outlined"
                type="text"
                autoComplete="family-name"
                inputProps={{ id: "last_name" }}
                required
                placeholder="Enter your last name."
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="icon">
                      <PersonOutline
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
              <label htmlFor="registration_number">Registration Number</label>
              <TextField
                variant="outlined"
                type="text"
                autoComplete="username"
                inputProps={{ id: "registration_number" }}
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
              <label htmlFor="email">Email</label>
              <TextField
                variant="outlined"
                type="email"
                autoComplete="email"
                inputProps={{ id: "email" }}
                required
                placeholder="Enter your email address."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="icon">
                      <MailOutline
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
              <label htmlFor="phone_number">Phone Number</label>
              <TextField
                variant="outlined"
                type="tel"
                inputProps={{ id: "phone_number" }}
                required
                autoComplete="tel-national"
                placeholder="Enter your phone number."
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="icon">
                      <PhonePortraitOutline
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
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={gender}
                  onChange={(e) => {
                    setGender(parseInt(e.target.value));
                  }}
                >
                  <FormControlLabel
                    value={Gender.male}
                    control={<Radio />}
                    label="Male"
                    className="radio-box"
                  />
                  <FormControlLabel
                    value={Gender.female}
                    control={<Radio />}
                    label="Female"
                    className="radio-box"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="inputBox">
              <label htmlFor="password">Password</label>
              <TextField
                variant="outlined"
                type={isVisible ? "text" : "password"}
                autoComplete="new-password"
                inputProps={{ id: "password" }}
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
            <div className="inputBox">
              <label htmlFor="confirm_password">Confirm Password</label>
              <TextField
                variant="outlined"
                type={isVisible ? "text" : "password"}
                autoComplete="current-password"
                inputProps={{ id: "confirm_password" }}
                required
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
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
                Create Account{" "}
                {isLoading && <ClipLoader size={40} color="#f45e14" />}
              </Button>
            </div>
          </form>
        </div>
        <div className="content_detail">
          <h3 className="main_txt">Hello, Student</h3>
          <p className="txt">
            Welcome Nnamdi Azikiwe University Students Hostel Portal
          </p>
          <p className="txt">
            Please fill in the details to create an account or proceed to login
            if you are returning student
          </p>
          <Link href="/auth/login">
            <a className="btn_link">Log In</a>
          </Link>
        </div>
      </section>
    </>
  );
}
