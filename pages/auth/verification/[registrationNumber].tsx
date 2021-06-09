import { Button } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import ReactCodeInput from "react-verification-code-input";
import { server_url } from "../../../config";
import { ClipLoader } from "react-spinners";
import { Check } from "@material-ui/icons";

export default function UserVerificationPage() {
  const [verificationCode, setVerification] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { query, push } = useRouter();
  const [isVerified, setVerificationStatus] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isLoading) return;
      await axios
        .put(`${server_url}/auth/verify`, {
          registrationNumber: query.registrationNumber,
          verificationCode,
        })
        .then(
          ({
            data: { message, token },
          }: AxiosResponse<{ token: string; message: string }>) => {
            localStorage.setItem("token", token);
            setMsg(message);
            setVerificationStatus(true);
          }
        )
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
          <h3 className="title">User Verification</h3>
          <p className="txt">
            Please enter the 6-digit code sent your mail in the form below to
            Verification your email address
          </p>
          <div className="inputBox">
            <ReactCodeInput
              autoFocus
              required
              onChange={(value) => {
                setVerification(value);
              }}
            />
          </div>
          <Button type="submit" className="btn">
            Verify Account
            {isLoading && <ClipLoader size={40} color="#f45e14" />}
          </Button>
        </form>
      ) : (
        <div className="verified">
          <div className="icon">
            <Check />
          </div>
          <div className="title">{msg}</div>

          <Button
            onClick={() => {
              push("/panel/dashboard");
            }}
            className="btn"
          >
            Proceed to dashboard
          </Button>
        </div>
      )}
    </section>
  );
}
