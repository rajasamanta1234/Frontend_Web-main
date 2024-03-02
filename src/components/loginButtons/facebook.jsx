import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth, provider } from "../../../firebaseConfig";

function FirebaseFacebook({ handleaccessToken }) {
  const handleFacebookLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        handleaccessToken(accessToken);
        // console.log(accessToken, "accessToken");
        // fetch facebook graph api to get user actual profile picture
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="loginWithColInner" onClick={handleFacebookLogin}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <g clipPath="url(#clip0_1458_72198)">
          <path
            d="M32 15.9991C32 7.1625 24.8366 -0.000940323 16 -0.000940323C7.16344 -0.000940323 0 7.1625 0 15.9991C0 23.9851 5.85097 30.6044 13.5 31.8047V20.6241H9.4375V15.9991H13.5V12.4741C13.5 8.46406 15.8887 6.24906 19.5434 6.24906C21.294 6.24906 23.125 6.56156 23.125 6.56156V10.4991H21.1074C19.1198 10.4991 18.5 11.7324 18.5 12.9977V15.9991H22.9375L22.2281 20.6241H18.5V31.8047C26.149 30.6044 32 23.9851 32 15.9991Z"
            fill="#1877F2"
          />
          <path
            d="M22.2281 20.625L22.9375 16H18.5V12.9987C18.5 11.7333 19.1198 10.5 21.1074 10.5H23.125V6.5625C23.125 6.5625 21.294 6.25 19.5434 6.25C15.8887 6.25 13.5 8.465 13.5 12.475V16H9.4375V20.625H13.5V31.8056C14.3146 31.9334 15.1495 32 16 32C16.8505 32 17.6854 31.9334 18.5 31.8056V20.625H22.2281Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_1458_72198">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default FirebaseFacebook;
