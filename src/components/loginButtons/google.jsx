import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import { provider2 } from "../../../firebaseConfig";

function FirebaseGoogle({ handleaccessToken }) {
  const handleFacebookLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider2)
      .then((result) => {
        console.log("result", result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token, credential, "token");
        // The signed-in user info.

        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        if (result) {
          handleaccessToken(result._tokenResponse.idToken);
          // console.log(result._tokenResponse.idToken, "result");
        }
      })
      .catch((error) => {
        console.log(error);
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
        <g clipPath="url(#clip0_1458_72189)">
          <path
            d="M31.2525 16.2989C31.2525 14.9879 31.1462 14.0312 30.9159 13.0391H15.9453V18.9564H24.7327C24.5556 20.4269 23.5989 22.6415 21.4729 24.1296L21.4431 24.3277L26.1765 27.9947L26.5045 28.0274C29.5162 25.2458 31.2525 21.1533 31.2525 16.2989Z"
            fill="#4285F4"
          />
          <path
            d="M15.9454 31.893C20.2505 31.893 23.8647 30.4756 26.5046 28.0308L21.473 24.133C20.1266 25.072 18.3194 25.7275 15.9454 25.7275C11.7289 25.7275 8.15015 22.9461 6.87442 19.1016L6.68743 19.1174L1.76554 22.9265L1.70117 23.1055C4.32322 28.3141 9.70911 31.893 15.9454 31.893Z"
            fill="#34A853"
          />
          <path
            d="M6.87401 19.0997C6.5374 18.1076 6.3426 17.0445 6.3426 15.9461C6.3426 14.8476 6.5374 13.7846 6.85631 12.7925L6.84739 12.5812L1.86382 8.71094L1.70076 8.7885C0.620092 10.95 0 13.3772 0 15.9461C0 18.515 0.620092 20.9421 1.70076 23.1036L6.87401 19.0997Z"
            fill="#FBBC05"
          />
          <path
            d="M15.9445 6.16537C18.9385 6.16537 20.9582 7.45869 22.1098 8.53948L26.6099 4.14571C23.8462 1.57679 20.2496 0 15.9445 0C9.70813 0 4.32224 3.57875 1.7002 8.78742L6.85574 12.7915C8.14917 8.94693 11.7279 6.16537 15.9445 6.16537Z"
            fill="#EB4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_1458_72189">
            <rect width="31.2672" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default FirebaseGoogle;
