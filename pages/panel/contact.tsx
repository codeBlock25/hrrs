import Main from "../../components/main";
import {
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";
import { FormEvent, useEffect, useState } from "react";

import { PersonOutline } from "react-ionicons";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../store";
import { Gender } from "../auth/register";
import axios from "axios";
import { server_url } from "../../config";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function pageName() {
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [subject, setSubject] = useState<String>("");
  const [msg, setMsg] = useState<String>("");

  const { details } = useSelector<
    AppReducerType,
    {
      details: {
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
        gender?: Gender;
        registrationNumber?: string;
        phone_number?: string;
        verificationCode?: string;
        isVerified?: boolean;
        date?: Date;

        yearOfStudy?: string;
        department?: string;
        nationality?: string;
        state?: string;
        lga?: string;
        address?: string;
        guardian_firstName?: string;
        guardian_lastName?: string;
        guardian_relationship?: string;
        guardian_phoneNumber?: string;
        _id?: string;
        userID?: string;
      };
    }
  >((state) => {
    return {
      details: state.record.details,
    };
  });
  useEffect(() => {
    setFirstName(details.first_name ?? "");
    setLastName(details.last_name ?? "");
  }, [details]);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoading) return;
      setLoading(true);
      let token = localStorage.getItem("token");
      await axios
        .put(
          `${server_url}/contact/message`,
          {
            first_name: firstName,
            last_name: lastName,
            subject,
            message: msg,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Message sent successful.");
          setSubject("");
          setMsg("");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <>
      <Main>
        <section className="page_view contact_page">
          <h3 className="title">Contact Reservation Adminstration</h3>
          <form className="formBody" onSubmit={handleSubmit}>
            <div className="inputBox">
              <label htmlFor="first_name">First Name</label>
              <TextField
                variant="outlined"
                type="text"
                inputProps={{
                  id: "first_name",
                }}
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
                inputProps={{
                  id: "last_name",
                }}
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
            <div
              className="inputBox"
              style={{ width: "100%", minWidth: "100%" }}
            >
              <label htmlFor="subject">Subject</label>
              <TextField
                variant="outlined"
                type="text"
                inputProps={{
                  id: "subject",
                }}
                required
                placeholder="Enter your subject."
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
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
            <div className="inputBox textarea">
              <label htmlFor="home_address">Home Address</label>
              <TextField
                variant="outlined"
                type="text"
                multiline
                rowsMax={8}
                fullWidth
                inputProps={{
                  id: "home_address",
                }}
                required
                placeholder="Enter your message."
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />
            </div>

            <Button type="submit" className="submit_btn">
              Send Message
              {isLoading && <ClipLoader size={25} color="#fff" />}
            </Button>
          </form>
        </section>
      </Main>
    </>
  );
}
