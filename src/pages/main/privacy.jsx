// import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";

export function Component() {
  return (
    <>
      <Seo title="Privacy Policy" metaName="Metaname">
        <div className="subpageBanner">
          <div className="container">
            <h1>Privacy Policy</h1>
            <h4>Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and, when necessary, disclose your information. By using our services, you agree to the collection and use of information in accordance with this policy.</h4>
          </div>
        </div>

        <div className="privacyContent">
          <div className="container">
            <div className="contentBlock">
              <h4 className="fontWeight-700">Information Collection</h4>
              <p className="subTextThree"><strong>Personal Data:</strong> We collect personal data you provide when you register, such as your name, email address, and other contact details.
                <br />
                <strong>Usage Data:</strong> Information on how you use Lightforth, including access times, viewed pages, and courses engaged with.<br />
                <strong>Cookies and Tracking Data:</strong> We use cookies to track activity on our service and hold certain information to enhance your experience.
              </p>
            </div>
            <div className="contentBlock">
              <h4 className="fontWeight-700">Use of Data</h4>
              <p className="subTextThree"><strong>Service Provision:</strong> To provide and maintain our Service, including monitoring the usage of our Service.<br/>
              <strong>Personalization:</strong> To personalize your experience and to deliver tailored content and service offerings.
              </p>
            </div>
            <div className="contentBlock">
              <h4 className="fontWeight-700">Data Sharing and Disclosure</h4>
              <p className="subTextThree"><strong>Service Providers:</strong> We may share your data with trusted third parties who assist us in operating our website, conducting our business, or serving our users.<br/>
              <strong>Legal Requirements:</strong> We may disclose your data when required by law or to protect the rights, property, or safety of our company, our users, or others.
              </p>
            </div>
            <div className="contentBlock">
              <h4 className="fontWeight-700">Data Security</h4>
              <p className="subTextThree">We value your trust in providing us with your Personal Data, and we strive to use commercially acceptable means of protecting it. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </div>
            <div className="contentBlock">
              <h4 className="fontWeight-700">Children's Privacy</h4>
              <p className="subTextThree">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.
              </p>
            </div>
            <div className="contentBlock">
              <h4 className="fontWeight-700">Changes to This Privacy Policy</h4>
              <p className="subTextThree">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </div>
          </div>
        </div>
      </Seo>
    </>
  );
}

Component.displayName = "privacy";
