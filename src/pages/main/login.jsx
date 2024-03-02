// import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { Link, useNavigate } from "react-router-dom";

import footerLogo from "@/assets/images/footer-logo.svg";
import facebookIcon from "@/assets/images/facebook-icon.svg";
import twitterIcon from "@/assets/images/twitter-icon.svg";

import { Grid } from "@mui/material";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  return (
    <>
      <Seo title="Login" metaName="Metaname" metaTags={metaTags}>
        <Grid container minHeight={'50vh'} padding={2} gap={2} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          <Grid item xs={12} md={4}>
            <Grid item container justifyContent={'center'} flexDirection={'column'} rowGap={2}>
              <Grid item>
                <button
                  onClick={() => {
                    navigate("/student/login");
                  }}
                  className="outlineBtn fullWidth"
                >
                  Login as Student
                </button>
              </Grid>
              <Grid item>
                <button
                  onClick={() => {
                    navigate("/instructor/login");
                  }}
                  className="outlineBtn fullWidth"
                >
                  Login as Instructor
                </button>
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </Seo>
    </>
  );
}

Component.displayName = "price";
