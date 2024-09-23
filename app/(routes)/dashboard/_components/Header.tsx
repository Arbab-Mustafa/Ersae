import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  const { user }: any = useKindeBrowserClient();

  return (
    <div className="flex justify-end items-center w-full gap-2">
      <div>
        <Image
          src={user?.picture}
          alt="Logo"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <Button className="flex gap-2 items-center text-sm bg-blue-600 hover:bg-blue-700 h-8">
        {user?.given_name}
        
      </Button>
    </div>
  );
};

export default Header;
