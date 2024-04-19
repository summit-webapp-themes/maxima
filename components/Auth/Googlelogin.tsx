import React, { useEffect, useState } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getAccessToken } from "../../store/slices/auth/token-login-slice";
import { jwtDecode } from "jwt-decode"; // Ensure you have jwt-decode installed

function Googleloggedin() {
  const router = useRouter();
  const REDIRECT_URI = "http://sns.digitalcatalog.in";
  const dispatch = useDispatch();
  const [access_token, setAccessToken] = useState<any>('');
  console.log('google', access_token)
  const guestLogin = null;
  const isOtpLoginState = false;
  const user_params = {
    values: access_token,
    guest: guestLogin,
    isOtpLogin: isOtpLoginState,
    isGoogleLogin: true,
  };

  useEffect(() => {
    if (access_token) {
      dispatch(getAccessToken(user_params));
    }
  }, [access_token]);

  return (
    <GoogleLogin
      onSuccess={(credentialResponse: any) => {
        const { clientId, credential } = credentialResponse;
        if (clientId && credential) {
          const decoded = jwtDecode(credential);
          console.log("Google Response:", credentialResponse);
          console.log("Decoded Token:", decoded);
          setAccessToken(decoded);
      
          // Redirect to a specific page after successful login
          router.push("/"); // Replace "/dashboard" with the desired page URL
        } else {
          console.error("Missing clientId or credential in credentialResponse");
        }
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default Googleloggedin;
