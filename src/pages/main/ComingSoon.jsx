// import { GuestGuard } from "../../../guards/student/guest-guard";
// import Seo from "@/components/common/seo";
import { Grid } from "@mui/material";
import logoTwo from "@/assets/images/logo-2.svg";

export function Component() {
 

  return (
    <>
     <Grid container minHeight={'100vh'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} className="comingSoonPage">
        <Grid item>
          <Grid item container justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={3}>
            <img src={logoTwo} width={200}/>
            <h1>Coming Soon</h1>
          </Grid>          
        </Grid>
     </Grid>
    </>
  );
}

Component.displayName = "comingSoon";
