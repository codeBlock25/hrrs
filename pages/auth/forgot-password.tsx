import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { MailOutline } from "react-ionicons";
import { toast } from "react-toastify";
import { TextField, InputAdornment } from "@material-ui/core";
import { server_url } from "../../config";
import { ClipLoader } from "react-spinners";
import { Check } from "@material-ui/icons";

export default function UserVerificationPage() {
  const [email, SetEmail] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const [isVerified, setVerificationStatus] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isLoading) return;
      await axios
        .put(`${server_url}/auth/forgot-password`, {
          email,
        })
        .then(() => {
          setVerificationStatus(true);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message ?? "Network error");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log({ error });
      toast.error("Network Error");
    }
  };
  return (
    <section className="UserVerification">
      {!isVerified ? (
        <form className="container" onSubmit={handleSubmit}>
          <h3 className="title">Account Recovery</h3>
          <p className="txt">
            A mail containing your new password would be sent to you
          </p>
          <div className="inputBox">
            <label htmlFor="email">Email</label>
            <TextField
              variant="outlined"
              type="text"
              autoComplete="email"
              inputProps={{ id: "email" }}
              required
              placeholder="Enter your registered email."
              value={email}
              onChange={(e) => {
                SetEmail(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="icon">
                    <MailOutline color={"#00000"} height="20px" width="20px" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button type="submit" className="btn">
            Generate Password
            {isLoading && <ClipLoader size={30} color="#fff" />}
          </Button>
        </form>
      ) : (
        <div className="verified">
          <div className="icon">
            <Check />
          </div>
          <div className="title">
            Your new password has been generated and sent to your email.
          </div>

          <Button
            onClick={() => {
              push("/auth/login");
            }}
            className="btn"
          >
            Proceed to Login
          </Button>
        </div>
      )}
    </section>
  );
}
