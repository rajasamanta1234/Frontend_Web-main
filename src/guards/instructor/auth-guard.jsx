import { useEffect, useState } from "react";
// import { useAuth } from '@/hooks/use-auth';

import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthGuard = (props) => {
  const { children } = props;
  // // const auth = useAuth();
  // const { isAuthenticated } = useSelector((state) => state.instructorUser);
  const router = useNavigate();
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated === "disconnected") {
  //     router("/instructor/login");
  //   } else {
  //     setChecked(true);
  //   }
  // }, [isAuthenticated]);

  // if (!checked) {
  //   return null;
  // }
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      router("/instructor/login");
      // getMe();
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return null;
  }
  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
