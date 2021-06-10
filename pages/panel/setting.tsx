import Main from "../../components/main";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import { FormEvent, useState } from "react";
import axios from "axios";
import { server_url } from "../../config";
import { toast } from "react-toastify";
import { LockClosedOutline, MailOutline } from "react-ionicons";
import { ClipLoader } from "react-spinners";

import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FormControlLabel } from "@material-ui/core";
import Switch, { SwitchProps } from "@material-ui/core/Switch";

export default function pageName() {
  const [isLoadingPassword, setLoadingPassword] = useState<boolean>(false);
  const [isLoadingEmail, setLoadingEmail] = useState<boolean>(false);
  const [isLoadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(true);

  // form1

  const [old_password, setOldPassword] = useState<string>("");
  const [new_password, setNewPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");

  const [old_email, setOldEmail] = useState<string>("");
  const [new_email, setNewEmail] = useState<string>("");
  const [confirm_email, setConfirmEmail] = useState<string>("");

  const handleSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoadingPassword) return;
      if (new_password !== confirm_password) return;
      setLoadingPassword(true);
      let token = localStorage.getItem("token");
      await axios
        .put(
          `${server_url}/security/change-password`,
          {
            old_password,
            new_password,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Your password has been updated successfully.");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoadingPassword(false);
        });
    } catch (error) {
      console.log(error);
      setLoadingPassword(false);
    }
  };

  const handleSubmitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoadingEmail) return;
      if (new_email !== confirm_email) return;
      setLoadingEmail(true);
      let token = localStorage.getItem("token");
      await axios
        .put(
          `${server_url}/security/change-email`,
          {
            old_email,
            new_email,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success("Your email has been updated successfully.");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoadingEmail(false);
        });
    } catch (error) {
      console.log(error);
      setLoadingEmail(false);
    }
  };

  const handleSubmitForgetPasswordRequest = async () => {
    try {
      if (isLoadingRequest) return;
      setLoadingRequest(true);
      let token = localStorage.getItem("token");
      await axios
        .get(`${server_url}/security/forgot-password`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Your request has been sent to your email.");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoadingRequest(false);
        });
    } catch (error) {
      setLoadingRequest(false);
    }
  };
  return (
    <>
      <Main>
        <section className="page_view setting_page">
          <div className="container">
            <form className="formBody" onSubmit={handleSubmitPassword}>
              <h3 className="title">Change Password</h3>
              <div className="inputBox">
                <label htmlFor="old_password">Old Password</label>
                <TextField
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                  inputProps={{
                    id: "old_password",
                  }}
                  required
                  placeholder="Enter your old password."
                  value={old_password}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
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
                  }}
                />
              </div>
              <div className="inputBox">
                <label htmlFor="new_password">New Password</label>
                <TextField
                  variant="outlined"
                  type="password"
                  autoComplete="new-password"
                  inputProps={{
                    id: "new_password",
                  }}
                  required
                  placeholder="Enter your new password."
                  value={new_password}
                  error={new_password !== confirm_password}
                  helperText={
                    new_password !== confirm_password
                      ? "Passwords do not match."
                      : ""
                  }
                  onChange={(e) => {
                    setNewPassword(e.target.value);
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
                  }}
                />
              </div>
              <div
                className="inputBox"
                style={{ width: "100%", minWidth: "100%" }}
              >
                <label htmlFor="confirm_password">Confirm Password</label>
                <TextField
                  variant="outlined"
                  type="text"
                  autoComplete="current-password"
                  inputProps={{
                    id: "confirm_password",
                  }}
                  required
                  placeholder="Enter your confirm password."
                  value={confirm_password}
                  error={new_password !== confirm_password}
                  helperText={
                    new_password !== confirm_password
                      ? "Passwords do not match."
                      : ""
                  }
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
                  }}
                />
              </div>
              <Button type="submit" className="submit_btn">
                Change Password
                {isLoadingPassword && <ClipLoader size={25} color="#fff" />}
              </Button>
            </form>
            <form className="formBody" onSubmit={handleSubmitEmail}>
              <h3 className="title">Change Email</h3>
              <div className="inputBox">
                <label htmlFor="old_email">Old Email</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "old_email",
                  }}
                  autoComplete="email"
                  required
                  placeholder="Enter your old password."
                  value={old_email}
                  onChange={(e) => {
                    setOldEmail(e.target.value);
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
                <label htmlFor="new_email">New Email</label>
                <TextField
                  variant="outlined"
                  type="text"
                  inputProps={{
                    id: "new_email",
                  }}
                  autoComplete="email"
                  required
                  placeholder="Enter your new email."
                  value={new_email}
                  error={new_email !== confirm_email}
                  helperText={
                    new_email !== confirm_email ? "Passwords do not match." : ""
                  }
                  onChange={(e) => {
                    setNewEmail(e.target.value);
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
              <div
                className="inputBox"
                style={{ width: "100%", minWidth: "100%" }}
              >
                <label htmlFor="confirm_email">Confirm Email</label>
                <TextField
                  variant="outlined"
                  type="text"
                  autoComplete="email"
                  inputProps={{
                    id: "confirm_email",
                  }}
                  required
                  placeholder="Enter your confirm email."
                  value={confirm_email}
                  error={new_email !== confirm_email}
                  helperText={
                    new_email !== confirm_email ? "Passwords do not match." : ""
                  }
                  onChange={(e) => {
                    setConfirmEmail(e.target.value);
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
              <Button type="submit" className="submit_btn">
                Change Email
                {isLoadingEmail && <ClipLoader size={25} color="#fff" />}
              </Button>
            </form>
          </div>
          <div className="container">
            <form className="formBody" onSubmit={handleSubmitPassword}>
              <h3 className="title">Forgot Password</h3>
              <p className="txt">
                Enter the email of your account to reset password. Then you will
                receive a link to your email to reset the password.
              </p>
              <Button
                className="submit_btn"
                onClick={handleSubmitForgetPasswordRequest}
              >
                Reset Password
                {isLoadingPassword && <ClipLoader size={25} color="#fff" />}
              </Button>
            </form>
            <form className="formBody" onSubmit={handleSubmitEmail}>
              <h3 className="title">Change Theme</h3>

              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={isLightMode}
                    onChange={(e: any) => {
                      setIsLightMode(e.target.checked as boolean);
                    }}
                    name="theme_mode"
                  />
                }
                label={isLightMode ? "Light Mode" : "Dark Mode"}
              />
            </form>
          </div>
        </section>
      </Main>
    </>
  );
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(
  ({
    classes,
    ...props
  }: SwitchProps &
    any & { checked: boolean; onChange: (e: any) => void; name: string }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  }
);
