import Main from "../../components/main";
import {
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { PersonOutline } from "react-ionicons";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../store";
import { Gender } from "../auth/register";
import axios from "axios";
import { server_url } from "../../config";

export enum ImageAction {
  upload,
  remove,
}

export default function ProfilePage() {
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [phoneNumber, setPhoneNumber] = useState<String>("");
  const [registrationNumber, setRegistrationNumber] = useState<String>("");
  const [dateOfBirth, setDateOfBirth] = useState<String>("");
  const [yearOfStudy, setYearOfStudy] = useState<String>("");
  const [department, setDepartment] = useState<String>("");
  const [nationality, setNationality] = useState<String>("");
  const [state, setState] = useState<String>("");
  const [lga, setLGA] = useState<String>("");
  const [address, setHomeAddress] = useState<String>("");

  //guardian

  const [guardian_firstName, setGuardianFirstName] = useState<String>("");
  const [guardian_lastName, setGuardianLastName] = useState<String>("");
  const [guardian_relationship, setGuardianRelationship] = useState<String>("");
  const [guardian_phoneNumber, setGuardianPhoneNumber] = useState<String>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleImageAction = ({
    evt,
    type,
  }: {
    evt: MouseEvent<HTMLButtonElement, MouseEvent>;
    type: ImageAction;
  }) => {
    if (type === ImageAction.upload) {
      toast.success("Image uploaded successfully.");
    } else if (type === ImageAction.remove) {
      toast.dark("Your profile image is now blank.");
    } else {
      toast.success("Error performing profile image action action.");
    }
  };

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
    setEmail(details.email ?? "");
    setPhoneNumber(details.phone_number ?? "");
    setRegistrationNumber(details.registrationNumber ?? "");
    setYearOfStudy(details.yearOfStudy ?? "");
    setDepartment(details.department ?? "");
    setNationality(details.nationality ?? "");
    setState(details.state ?? "");
    setLGA(details.lga ?? "");
    setHomeAddress(details.address ?? "");

    //guardian
    setGuardianFirstName(details.guardian_firstName ?? "");
    setGuardianLastName(details.guardian_lastName ?? "");
    setGuardianRelationship(details.guardian_relationship ?? "");
    setGuardianPhoneNumber(details.guardian_phoneNumber ?? "");
    console.log(details);
  }, [details]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      let token = localStorage.getItem("token");
      if (isLoading) return;
      setLoading(true);
      await axios
        .put(
          `${server_url}/student/update`,
          {
            firstName,
            lastName,
            email,
            registrationNumber,
            phone_number: phoneNumber,
            yearOfStudy,
            department,
            nationality,
            state,
            lga,
            address,
            guardian_firstName,
            guardian_lastName,
            guardian_relationship,
            guardian_phoneNumber,
          },
          {
            headers: `Bearer ${token}`,
          }
        )
        .then(() => {
          toast.success("Update successful");
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
    }
  };
  return (
    <>
      <Main>
        <form className="page_view profile_page" onSubmit={handleSubmit}>
          <div className="details">
            <span className="avatar"></span>
            <div className="content">
              <p className="txt">
                Max file size is 5MB, Minimum dimension: 150px x 150px and
                Suitable file type include .jpg and .png
              </p>
              <Button
                className="btn upload"
                onClick={(e) => {
                  handleImageAction({
                    evt: e as any,
                    type: ImageAction.upload,
                  });
                }}
              >
                Upload image
              </Button>
              <Button
                className="btn remove"
                onClick={(e) => {
                  handleImageAction({
                    evt: e as any,
                    type: ImageAction.upload,
                  });
                }}
              >
                Remove Image
              </Button>
            </div>
          </div>
          <ul>
            <li>Section A (student)</li>
            <div className="formBody">
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
              <div className="inputBox">
                <label htmlFor="email">Email</label>
                <TextField
                  variant="outlined"
                  type="email"
                  inputProps={{
                    id: "email",
                  }}
                  required
                  placeholder="Enter your email address."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                <label htmlFor="phone_number">Phone Number</label>
                <TextField
                  variant="outlined"
                  type="tel"
                  inputProps={{
                    id: "phone_number",
                  }}
                  required
                  placeholder="Enter your phone number."
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
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
                  inputProps={{
                    id: "registration_number",
                  }}
                  required
                  placeholder="Enter your first name."
                  value={registrationNumber}
                  onChange={(e) => {
                    setRegistrationNumber(e.target.value);
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
                <label htmlFor="year_of_school">Year of Study</label>
                <TextField
                  variant="outlined"
                  type="number"
                  inputProps={{
                    id: "year_of_school",
                  }}
                  required
                  placeholder="Enter year of study."
                  value={yearOfStudy}
                  onChange={(e) => {
                    setYearOfStudy(e.target.value);
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
                <label htmlFor="department">Department</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "department",
                  }}
                  required
                  placeholder="Enter your department."
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
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
                <label htmlFor="nationality">Nationality</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "nationality",
                  }}
                  required
                  placeholder="Enter your nationality."
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value);
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
              <div className="division">
                <div className="inputBox">
                  <label htmlFor="state">State</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    inputProps={{
                      id: "state",
                    }}
                    required
                    placeholder="Enter your state of origin."
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
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
                  <label htmlFor="lga">LGA</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    inputProps={{
                      id: "lga",
                    }}
                    required
                    placeholder="Enter your local government area."
                    value={lga}
                    onChange={(e) => {
                      setLGA(e.target.value);
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
                  placeholder="Enter your home address."
                  value={address}
                  onChange={(e) => {
                    setHomeAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <li>Section B (guardian)</li>
            <div className="formBody">
              <div className="inputBox">
                <label htmlFor="guardian_first_name">First Name</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "guardian_first_name",
                  }}
                  required
                  placeholder="Enter your guardian's first name."
                  value={guardian_firstName}
                  onChange={(e) => {
                    setGuardianFirstName(e.target.value);
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
                <label htmlFor="guardian_last_name">Last Name</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "guardian_last_name",
                  }}
                  required
                  placeholder="Enter your guardian's last name."
                  value={guardian_lastName}
                  onChange={(e) => {
                    setGuardianLastName(e.target.value);
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
                <label htmlFor="guardian_phone_number">Phone number</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "guardian_phone_number",
                  }}
                  required
                  placeholder="Enter your guardian's  phone number."
                  value={guardian_phoneNumber}
                  onChange={(e) => {
                    setGuardianPhoneNumber(e.target.value);
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
                <label htmlFor="first_name">Relationship</label>
                <Select
                  variant="outlined"
                  inputProps={{
                    id: "first_name",
                  }}
                  required
                  value={guardian_relationship}
                  onChange={(e) => {
                    setGuardianRelationship(e.target.value as string);
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="parent / legal guardian">
                    Parent / Legal Guardian
                  </MenuItem>
                  <MenuItem value="sibling">Sibling</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                </Select>
              </div>
            </div>
          </ul>
          <Button type="submit" className="submit_btn">
            Update
          </Button>
        </form>
      </Main>
    </>
  );
}
