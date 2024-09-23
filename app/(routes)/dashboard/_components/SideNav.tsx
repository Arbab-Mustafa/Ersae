"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNaveBottomSection from "./SideNaveBottomSection";
import SideNaveTopSection, { Team } from "./SideNaveTopSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useContext, useEffect, useState } from "react";

import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<Team>();
  const convex = useConvex();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const [fileList_, setFileList_] = useContext(FileListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    createFile({
      fileName: fileName,
      createdBy: user?.email,
      teamId: activeTeam?._id,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (res) => {
        if (res) {
          getFiles();
          toast("file created sucessfully");
        }
      },
      (err) => {
        toast("file creation failed");
      }
    );
  };

  const getFiles = async () => {
    const resultedFiles = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });

    setFileList_(resultedFiles);
    setTotalFiles(resultedFiles?.length);
  };

  return (
    <div className=" h-screen w-72 border-r p-6  border-[1px] fixed flex flex-col">
      <div className="flex-1">
        <SideNaveTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: Team) => {
            setActiveTeam(activeTeam);
          }}
        />
      </div>
      <div>
        <SideNaveBottomSection
          onFileCreate={onFileCreate}
          totalFiles={totalFiles}
        />
      </div>
    </div>
  );
};

export default SideNav;
