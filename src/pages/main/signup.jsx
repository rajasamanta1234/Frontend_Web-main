// import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();
  return (
    <>
      <Seo title="Sign Up" metaName="Metaname" metaTags={metaTags}>
        <Grid container minHeight={'50vh'} padding={2} gap={2} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
          <Grid item xs={12} md={4}>
            <Grid item container justifyContent={'center'} flexDirection={'column'} rowGap={2}>
              <Grid item>
                <button
                  onClick={() => {
                    navigate("/student/signup");
                  }}
                  className="outlineBtn fullWidth"
                >
                  Sign up as Student
                </button>

              </Grid>
              <Grid item>
                <button
                  onClick={() => {
                    navigate("/instructor/signup");
                  }}
                  className="outlineBtn fullWidth"
                >
                  Sign up as Instructor
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
