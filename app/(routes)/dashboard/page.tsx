"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

const Dashboard = () => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  // const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((res) => console.log(res));
    }
  };
  return (
    <div className="p-8">
      <Header />
      <FileList />
    </div>
  );
};

export default Dashboard;
