import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <Image src="/logo-1.png" alt="logo" width={50} height={50} />
        </div>

        <div className="flex flex-1 items-center justify-end  ">
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md   px-5 py-2.5 text-sm font-medium text-white transition "
                href="#"
              >
                <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
              </a>

              <a
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition  sm:block"
                href="#"
              >
                <RegisterLink>Sign up</RegisterLink>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
