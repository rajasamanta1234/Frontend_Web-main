import submenuIconOne from "../../assets/images/icon/01.svg";
import submenuIconTwo from "../../assets/images/icon/02.svg";
import submenuIconThree from "../../assets/images/icon/03.svg";
import submenuIconFour from "../../assets/images/icon/04.svg";
import submenuIconFive from "../../assets/images/icon/05.svg";
import submenuIconSix from "../../assets/images/icon/06.svg";
import submenuIconSaven from "../../assets/images/icon/07.svg";
import submenuIconEight from "../../assets/images/icon/08.svg";
import arrowDownIcon from "../../assets/images/arrow-down.svg";
import mobileBarIcon from "../../assets/images/mobileBar.svg";
import closeIcon from "../../assets/images/close.svg";
import searchIcon from "../../assets/images/search-normal.svg";
import searchBlackIcon from "../../assets/images/search-normal-black.svg";
import Logo from "../../assets/images/logo-1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Close } from "@mui/icons-material";

const top100Films = [
  { title: "DevOps Engineer", year: 1994 },
  { title: "Cyber Security", year: 1972 },
];

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [navbarshow, setnavBarshow] = useState("closebutton");
  const [dropdown, showDropDown] = useState("");
  const [searchbar, setSearchbar] = useState("");
  const [loginUrl, setloginUrl] = useState("/student/login");
  const [signupUrl, setsignupUrl] = useState("/student/signup");
  useEffect(() => {
    // if (location.pathname) {
    //   if (location.pathname == "/instructors") {
    //     setloginUrl("/instructor/login");
    //     setsignupUrl("/instructor/signup");
    //   } else {
    //     setloginUrl("/student/login");
    //     setsignupUrl("/student/signup");
    //   }
    // }
  }, [location.pathname]);
  return (
    <header>
      <div className="headerTop">
        <div className="container">
          <div className="headerTopRow">
            <div className="left">
              <div className="logoBlock">
                <Link to={"/"}>
                  <img src={Logo} alt="logo" /> LIGHTFORTH
                </Link>
              </div>
              <div className="searchAutocomplete">
                {/* <input type="text" className="form-control" placeholder="Search for..." /> */}
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={top100Films.map((option) => option.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search for..."
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
                <button>
                  <img src={searchIcon} alt="" />
                </button>
              </div>
            </div>
            <div className="right">
              <div className="forMobileSearch">
                <button
                  onClick={() => {
                    if (searchbar == "") {
                      setSearchbar("show");
                    } else {
                      setSearchbar("");
                    }
                  }}
                >
                  <img src={searchBlackIcon} />
                </button>
                <div className={`filterSearchBlock ${searchbar}`}>
                  <Button
                    sx={{ marginBottom: 2 }}
                    onClick={() => setSearchbar("")}
                  >
                    <Close fontSize="small" /> Close
                  </Button>
                  <div className="searchAutocomplete">
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={top100Films.map((option) => option.title)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search for..."
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                    <button>
                      <img src={searchIcon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`navMobileBar ${navbarshow}`}
                onClick={() => {
                  if (navbarshow == "closebutton") {
                    setnavBarshow("show");
                  } else {
                    setnavBarshow("closebutton");
                  }
                }}
              >
                <img src={mobileBarIcon} alt="" />
                <img src={closeIcon} alt="" />
              </div>
              <ul>
                <li>
                  <Link to={"/instructor/login"} className="color-primary">
                    Become an instructor
                  </Link>
                </li>
                <li>
                  <Link to={loginUrl} className="primaryOutlineBtn">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to={signupUrl} className="primaryBtn">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`headerBottom ${navbarshow}`}>
        <div className="container">
          <div className="headerRow">
            <div className="mainNav mobile-mode">
              <ul className="forMobile">
                <li>
                  <Link to={"/instructor/login"} className="color-primary">
                    Become an instructor
                  </Link>
                </li>
                <li>
                  <Link to={loginUrl} className="primaryOutlineBtn">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to={signupUrl} className="primaryBtn">
                    Create Account
                  </Link>
                </li>
              </ul>
              <div className="navLeft">
                <ul>
                  <li className="dropdownMenu">
                    <Link
                      to="/categories/DevOps Engineer"
                      onClick={() => {
                        setnavBarshow("closebutton"), showDropDown("");
                      }}
                    >
                      Categories
                    </Link>
                    <button
                      className="dropdownMenuBtn"
                      onClick={() => {
                        if (dropdown == "") {
                          showDropDown("show");
                        } else {
                          showDropDown("");
                        }
                      }}
                    >
                      <img src={arrowDownIcon} />
                    </button>
                    <div className={`dropdownMenuOpen ${dropdown}`}>
                      <div className="dropdownMenuOpenInner">
                        <Button
                          sx={{ minWidth: "initial", padding: "9px 0" }}
                          onClick={() => {
                            if (dropdown == "") {
                              showDropDown("show");
                            } else {
                              showDropDown("");
                            }
                          }}
                        >
                          <KeyboardBackspaceIcon />
                          &nbsp; Back
                        </Button>
                        <ul>
                          <li>
                            <Link to="/categories/DevOps Engineer">
                              <img src={submenuIconOne} alt="" /> DevOps
                              Engineer
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/Project Lead">
                              <img src={submenuIconTwo} alt="" /> Project Lead
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/Business Analyst">
                              <img src={submenuIconThree} alt="" /> Business
                              Analyst
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/Marketing Officer">
                              <img src={submenuIconFour} alt="" /> Marketing
                              Officer
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/Program Manager">
                              <img src={submenuIconFive} alt="" /> Program
                              Manager
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/Technical Specialist">
                              <img src={submenuIconSix} alt="" /> Technical
                              Specialist
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/UI Designer">
                              <img src={submenuIconSaven} alt="" /> UI Designer
                            </Link>
                          </li>
                          <li>
                            <Link to="/categories/System Analyst">
                              <img src={submenuIconEight} alt="" /> System
                              Analyst
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      setnavBarshow("closebutton"), showDropDown("");
                    }}
                  >
                    <Link to={"/instructors"}>Instructor</Link>
                  </li>
                  <li
                    onClick={() => {
                      setnavBarshow("closebutton"), showDropDown("");
                    }}
                  >
                    <Link to={"/about"}>About Lightforth</Link>
                  </li>
                  <li
                    onClick={() => {
                      setnavBarshow("closebutton"), showDropDown("");
                    }}
                  >
                    <Link to={"/blog"}>Blogs</Link>
                  </li>
                  <li
                    onClick={() => {
                      setnavBarshow("closebutton"), showDropDown("");
                    }}
                  >
                    <Link to={"/price"}>Pricing</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
