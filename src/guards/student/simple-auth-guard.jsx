import { useEffect, useState } from "react";
// import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

export const AuthGuard = (props) => {
  const { children } = props;
  // const auth = useAuth();
  // const { isAuthenticated } = useSelector((state) => state.studetnUser);
  // const router = useNavigate();
  // const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated === "disconnected") {
  //     router("/student/login");
  //   } else {
  //     setChecked(true);
  //   }
  // }, [isAuthenticated]);

  // if (!checked) {
  //   return null;
  // }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
