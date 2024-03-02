import { useEffect, useState } from "react";
// import { useAuth } from '@/hooks/use-auth';
import { Router } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthGuard = (props) => {
  const { children } = props;
  // const auth = useAuth();
  // const { isAuthenticated } = useSelector((state) => state.studetnUser);
  const router = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      router("/student/login");
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
