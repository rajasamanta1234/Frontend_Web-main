import { Link } from "react-router-dom";

import footerLogo from "@/assets/images/footer-logo.svg";
import facebookIcon from "@/assets/images/facebook-icon.svg";
import twitterIcon from "@/assets/images/twitter-icon.svg";
import instagramIcon from "@/assets/images/instagram-icon.svg";
import linkedinIcon from "@/assets/images/linkedin-icon.svg";
import envolopeIcon from "@/assets/images/envolope.svg";
import PhoneCallIcon from "@/assets/images/PhoneCall.svg";
import { Grid } from "@mui/material";
import moment from "moment";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footerRow">
          <div className="left">
            <h3>Contact Us.</h3>
            <div className="contactInfoBlock">
              <div className="contactInfoCol">
                <div className="imgBlock">
                  <img src={envolopeIcon} alt="" />
                </div>
                <div className="contentBlock">
                  <p className="smallText">Email address</p>
                  <p className="subTextOne"><Link to="mailto:Info@lightforth.ai">Info@lightforth.ai</Link></p>
                </div>
              </div>
              <div className="contactInfoCol">
                <div className="imgBlock">
                  <img src={PhoneCallIcon} alt="" />
                </div>
                <div className="contentBlock">
                  <p className="smallText">Phone Number</p>
                  <p className="subTextOne"><Link to="call:+1-202-555-0177">+1-202-555-0177</Link></p>
                </div>
              </div>
            </div>
            <div className="footerContactBlock">
              <div className="row">
                <div className="col-12">
                  <div className="formGroup">
                    <label>Message</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="formGroup">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <button className="primaryBtn fullWidth">Send Message</button>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="fotterLogoSocial">
              <div className="footerLogo">
                <Link to="/"><img src={footerLogo} alt="LightFourth logo" /></Link>
              </div>
              <div className="footersocialBlock">
                <ul>
                  <li>
                    <Link to="#">
                      <img src={facebookIcon} alt="facebook-icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src={twitterIcon} alt="twitter-icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src={linkedinIcon} alt="linkedin-icon" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <img src={instagramIcon} alt="instagram-icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footerNav">
              <Grid container>
                <Grid item xs={12} md={4}>
                  <p className="mainText fontWeight-500">Quick Links</p>
                  <ul>
                    <li>
                      <Link to="#">Categories</Link>
                    </li>
                    <li>
                      <Link to="/instructors">Instructor</Link>
                    </li>
                    <li>
                      <Link to="#">Ambassador</Link>
                    </li>
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blogs</Link>
                    </li>
                    <li>
                      <Link to="#">Careers</Link>
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={4}>
                  <p className="mainText fontWeight-500">LEGAL</p>
                  <ul>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Cookie Policy</Link>
                    </li>
                    <li>
                      <Link to="#">Cookies</Link>
                    </li>
                    <li>
                      <Link to="#">Design Concept</Link>
                    </li>
                    <li>
                      <Link to="#">App Design</Link>
                    </li>
                  </ul>
                </Grid>
                <Grid item xs={12} md={4}>
                  <p className="mainText fontWeight-500">POPULAR CATEGORIES</p>
                  <ul>
                    <li>
                      <Link to="#">DevOps Engineer</Link>
                    </li>
                    <li>
                      <Link to="#">DevOps Engineer</Link>
                    </li>
                    <li>
                      <Link to="#">Project Lead</Link>
                    </li>
                    <li>
                      <Link to="#">Marketing Officer</Link>
                    </li>
                    <li>
                      <Link to="#">Program Manager</Link>
                    </li>
                    <li>
                      <Link to="#">Product Design</Link>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </div>
            <Grid container justifyContent={"center"} paddingTop={4}>
              <p className="mainText text-center color-white fontWeight-400">
                © {moment().format('YYYY')} - lightforth.ai
              </p>
            </Grid>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
