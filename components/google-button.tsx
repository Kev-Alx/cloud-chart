"use client";

import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/hooks/use-google-auth";
import { Google } from "./icons/google";
import { Loader } from "./loader";

type GoogleAuthButtonProps = {
  method: "signup" | "signin";
};

const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth();
  return (
    <Button
      {...(method === "signin"
        ? {
            onClick: () => signInWith("oauth_google"),
          }
        : {
            onClick: () => signUpWith("oauth_google"),
          })}
      className="w-full text-black rounded-xl flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      <Loader loading={false}>
        <Google />
        Google
      </Loader>
    </Button>
  );
};
export default GoogleAuthButton;
