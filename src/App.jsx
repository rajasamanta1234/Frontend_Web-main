// import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "./theme";

import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <CssBaseline /> */}
          <ThemeProvider
            theme={createTheme({
              direction: "ltr",
              responsiveFontSizes: true,
              mode: "light",
            })}
          >
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Routes />
          </ThemeProvider>
        </LocalizationProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
