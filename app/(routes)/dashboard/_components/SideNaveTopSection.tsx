import React, { useEffect, useState } from "react";
import { ChevronDown, LayoutGrid, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface Team {
  _id: string;
  teamName: string;
  createdBy: string;
}

const SideNaveTopSection = ({ user, setActiveTeamInfo }: any) => {
  const router = useRouter();
  const [activeTeam, setActiveTeam] = useState<Team>();
  const [teamList, setTeamList] = useState<Team[]>([]);
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/team/create",
      icon: User,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  useEffect(() => {
    getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const convex = useConvex();
  const getTeamList: any = async () => {
    const teams = await convex.query(api.teams.getTeam, { email: user?.email });
    setTeamList(teams);
    setActiveTeam(teams[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };
  return (
    <div>
      <div className="flex item-center gap-1 md:gap-3 hover:bg-slate-200 rounded-lg p-3 cursor-pointer ">
        <Image src="/logo-1.png" alt="logo" width={40} height={40} />
        <Popover>
          <PopoverTrigger>
            <h2 className="flex gap-3 item-center justify-center  font-blod text-[17px]">
              {activeTeam?.teamName} <ChevronDown />{" "}
            </h2>
          </PopoverTrigger>
          <PopoverContent className="ml-7 p-4">
            <div>
              {teamList.map((team, i) => (
                <h2
                  onClick={() => setActiveTeam(team)}
                  key={i}
                  className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer
                    ${activeTeam?._id === team._id ? "bg-blue-500 text-white" : ""}

                    `}
                >
                  {team.teamName}
                </h2>
              ))}
            </div>
            <Separator className="mt-2 bg-slate-100" />
            {/*  */}

            <div>
              {menu.map((item, index) => (
                <h2
                  onClick={() => onMenuClick(item)}
                  className="flex item-center  cursor-pointer gap-1 md:gap-2 p-2 hover:bg-gray-100 text-sm rounded-lg"
                  key={index}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}

                  {item.name}
                </h2>
              ))}
              <LogoutLink>
                <h2 className="flex item-center  cursor-pointer gap-1 md:gap-2 p-2 hover:bg-gray-100 text-sm rounded-lg">
                  <LogOut className="h-4 w-4" />
                  LogOut
                </h2>
              </LogoutLink>
            </div>
            <Separator className="mt-2 bg-slate-100" />
            {/*  */}
            {user && (
              <div className="mt-2 flex gap-2 md:gap-3 items-center">
                <Image
                  src={user?.picture}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-sm font-bold">{user?.given_name}</h2>
                  <h2 className="text-xs">{user?.email}</h2>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100"
        >
          <LayoutGrid className="h-5 w-5" />
          All Files
        </Button>
      </div>
    </div>
  );
};

export default SideNaveTopSection;
