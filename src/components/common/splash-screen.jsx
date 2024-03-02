import lightforthLoader from "@/assets/images/lightforth-loader.svg";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const hostname = window.location.hostname;
  const navigate = useNavigate();
  useEffect(() => {
    if (hostname == "lightforth.ai") {
      navigate("/coming-soon");
    }
  }, [hostname]);
  return (
    <Box
    className="splashScreen"
      sx={{
        
      }}
    >
      <img src={lightforthLoader} alt="logo" width={300} />
    </Box>
  );
};

export default SplashScreen;
