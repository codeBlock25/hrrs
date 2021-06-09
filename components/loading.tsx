import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { server_url } from "../config";
import { AnimatePresence, motion } from "framer-motion";
import { FadeLoader } from "react-spinners";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const { push, pathname } = useRouter();
  const [shouldReload, setShouldReload] = useState(true);
  const checkLoginStatus = useCallback(async () => {
    let token = localStorage.getItem("token");
    let isException = pathname.includes("/auth/");
    if (isException) {
      setLoading(false);
      return;
    }
    if (!shouldReload) return;
    setShouldReload(false);
    if (!token || token === "") {
      push("/auth/login");
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      return;
    }
    await axios
      .get(`${server_url}/details`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        push("/panel/dashboard");
      })
      .catch(() => {
        push("/auth/login");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.section
          className="Loading"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          exit={{ x: "-100%" }}
        >
          <div className="content">
            <span className="logo"></span>
            <FadeLoader
              height={20}
              width={6}
              radius={5}
              margin={5}
              color="#f45e14"
            />
            <h3>loading...</h3>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
