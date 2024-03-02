import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const LinkedInLogin = ({ handleaccessToken }) => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const clientId = import.meta.env.VITE_LINKDIN_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_LINKDIN_CLIENT_SECRET;
  const redirectUri = location.pathname.includes("/student/login")
    ? import.meta.env.VITE_LINKDIN_REDIRECT_URL_STUDENT
    : import.meta.env.VITE_LINKDIN_REDIRECT_URL_INSTRUCTOR;
  const scope = "openid profile w_member_social email r_learningdata";

  
  const refforApi = useRef(false);
  const fetchAccessToken = useCallback(
    (code) => {
      console.log({ accessToken: code });
      let mydata = {
        accessToken: code,
        role: location.pathname.includes("/student/login")
          ? "student"
          : "instructor",
      };
      fetch(`${import.meta.env.VITE_API_URL}auth/generateaccesstokenlinkedin`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mydata),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("dataconsole", data);
          if (data.success) {
            handleaccessToken(data?.data?.access_token);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`,
      // })
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     console.log("dataconsole", data);
      //     if (data) {
      //       setLoggedIn(true);
      //       setLoginData(data);
      //       handleaccessToken(data?.access_token);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //     if (error) {
      //       toast.error("Linked Expired");
      //     }
      //   });
    },
    [clientId, clientSecret, handleaccessToken]
  );
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("hlw", code, loggedIn);

    if (code && !loggedIn && refforApi.current === false) {
      refforApi.current = true;
      fetchAccessToken(code);
    }
  }, [fetchAccessToken, loggedIn]);

  const handleLogin = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };
  return (
    <div>
      <div className="loginWithColInner" onClick={handleLogin}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M23.8573 23.8579H19.7086V17.3606C19.7086 15.8112 19.681 13.8168 17.5508 13.8168C15.39 13.8168 15.0594 15.5048 15.0594 17.2478V23.8575H10.9107V10.4964H14.8935V12.3223H14.9492C15.3478 11.6408 15.9238 11.0801 16.6158 10.7001C17.3078 10.32 18.0899 10.1348 18.8789 10.164C23.0838 10.164 23.8591 12.9299 23.8591 16.5282L23.8573 23.8579ZM6.22956 8.67001C5.75339 8.6701 5.28788 8.52898 4.89191 8.26449C4.49594 8.00001 4.18732 7.62404 4.00502 7.18413C3.82271 6.74423 3.77494 6.26014 3.86775 5.79309C3.96056 5.32604 4.18979 4.897 4.52643 4.56022C4.86308 4.22345 5.29202 3.99406 5.75903 3.90108C6.22603 3.8081 6.71011 3.85569 7.15006 4.03784C7.59002 4.21999 7.96608 4.52851 8.2307 4.9244C8.49532 5.32029 8.63661 5.78576 8.63669 6.26194C8.63675 6.57812 8.57452 6.89121 8.45358 7.18334C8.33265 7.47547 8.15537 7.74091 7.93185 7.96453C7.70833 8.18814 7.44293 8.36553 7.15086 8.48657C6.85878 8.60762 6.54573 8.66996 6.22956 8.67001ZM8.30392 23.8579H4.15088V10.4964H8.30392V23.8579ZM25.9256 0.00190769H2.06616C1.52461 -0.00420383 1.00277 0.204941 0.615347 0.583383C0.227922 0.961825 0.00660924 1.4786 0 2.02016V25.9794C0.00638303 26.5212 0.227566 27.0384 0.614977 27.4172C1.00239 27.796 1.52434 28.0056 2.06616 27.9998H25.9256C26.4685 28.0066 26.9919 27.7977 27.3809 27.4189C27.7698 27.04 27.9925 26.5223 28 25.9794V2.01843C27.9923 1.4758 27.7694 0.958434 27.3805 0.580001C26.9915 0.201569 26.4683 -0.00697834 25.9256 0.000178292"
            fill="#0A66C2"
          />
        </svg>
      </div>
    </div>
  );
};

export default LinkedInLogin;
