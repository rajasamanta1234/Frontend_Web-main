/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { setAuthUserState } from "../../redux/slice/superAdmin/user";

export const AuthGuard = (props) => {
  const { children } = props;
  // const auth = useAuth();

  // const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.superAdminUser);
  const router = useNavigate();
  const [checked, setChecked] = useState(false);
  // const [getMe, { isSuccess, data }] = useMeMutation();

  // const getData = async () => {
  //   try {
  //     const res = await getMe().unwrap();
  //     console.log(res, "auth");
  //     dispatch(
  //       setAuthUserState({
  //         isAuthenticated: "authenticated",
  //         isInitialized: true,
  //         user: "SD",
  //       })
  //     );
  //   } catch (error) {
  //     router("/super-admin/login");
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   // getData();
  // }, [isAuthenticated]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      router("/super-admin/login");
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
