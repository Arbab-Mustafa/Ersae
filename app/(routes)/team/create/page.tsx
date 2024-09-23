"use client";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = async () => {
    await createTeam({
      teamName,
      createdBy: user?.email,
    }).then((res) => {
      console.log(res);
      if (res) {
        toast("Team has been created.");
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="px-6 md:px-16 py-16">
      <Image src="/logo-black.png" alt="" width={150} height={150} />

      <div className="flex justify-center items-center py-8 flex-col">
        <h2 className="font-bold text-[40px] py-3">
          what should we call your Team
        </h2>
        <h3 className="text-gray-500">you can change from the setting</h3>

        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">Team Name</label>
          <Input
            placeholder="Enter Team Name"
            className="mt-3"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <Button
          className="mt-9 w-[40%] bg-blue-500 hover:bg-blue-600 "
          disabled={!(teamName && teamName.length > 0)}
          onClick={() => createNewTeam()}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;
