import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";

import { Link, useLocation } from "react-router-dom";

export function Component() {
  const metaTags = [
    { name: "Metaname1", content: "content1" },
    { name: "Metaname2", content: "content2" },
  ];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fullName = queryParams.get("fullName");

  return (
    <GuestGuard>
      <Seo title="Reset Password Success" metaName="Metaname" metaTags={metaTags}>
        <section className="authSec">
          <div className="container">
            <div className="resetpasssucss">
              <div className="resetpasssucssInner">
                <div className="contentBlock">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1458_72429)">
                      <path
                        d="M31.9987 58.6693C17.2707 58.6693 5.33203 46.7306 5.33203 32.0026C5.33203 17.2746 17.2707 5.33594 31.9987 5.33594C46.7267 5.33594 58.6654 17.2746 58.6654 32.0026C58.6654 46.7306 46.7267 58.6693 31.9987 58.6693ZM29.34 42.6693L48.1934 23.8133L44.4227 20.0426L29.34 35.1279L21.796 27.5839L18.0254 31.3546L29.34 42.6693Z"
                        fill="#00BF71"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1458_72429">
                        <rect width="64" height="64" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="mainText">
                    Hi {fullName} 👋, your password was reset successfully!
                  </p>
                </div>
                <div>
                  <Link to={"/student/login"} className="primaryBtn">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Seo>
    </GuestGuard>
  );
}

Component.displayName = "Studentresetpasswordsuccess";
