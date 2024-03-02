import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

export const GuestGuard = (props) => {
  const { children } = props;
  const { isAuthenticated } = useSelector((state) => state.superAdminUser);

  const router = useNavigate();
  const [checked, setChecked] = useState(false);
  //const disableGuard = router.query.disableGuard as string;

  useEffect(() => {
    if (isAuthenticated === "authenticated") {
      router("/super-admin/dashboard");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};
