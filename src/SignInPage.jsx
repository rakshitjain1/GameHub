// SignInPage.jsx
import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const SignInPage = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/library");
    }
  }, [isSignedIn, navigate]);

  return <SignIn path="/sign-in" routing="path" />;
};

export default SignInPage;
