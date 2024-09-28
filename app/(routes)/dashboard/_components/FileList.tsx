import { FileListContext } from "@/app/_context/FileListContext";
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Crosshair, CrossIcon, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export interface FILE {
  archieve: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: string;
}

const FileList = () => {
  const [fileList_, setFileList_] = useContext(FileListContext);
  const [fileList, setFileList] = useState<any>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const convex = useConvex();

  const handleDeleteFile = async (fileID: any) => {
    try {
      // Check if the ID is valid
      if (!fileID) {
        throw new Error("Invalid file ID");
      }

      // Call the mutation with the file ID
      const result = await convex.mutation(api.files.deleteFile, {
        _id: fileID, // Ensure this is a valid string ID
      });

      toast("if UI does not updates then refresh Page");
      return;
    } catch (error) {
      toast("error while deleting");
      throw error;
    }
  };

  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(fileList);
  }, [fileList_]);
  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right font-semibold ">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                FileName
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {" "}
                Created At{" "}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {" "}
                Edited{" "}
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {" "}
                Author{" "}
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {fileList?.map((file: FILE, index: number) => (
              <tr
                className="odd:bg-gray-50  cursor-pointer hover:bg-gray-100"
                key={index}
              >
                <td
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  onClick={() => {
                    router.push("/workspace/" + file._id);
                  }}
                >
                  {file.fileName}
                </td>
                <td
                  className="whitespace-nowrap px-4 py-2 text-gray-700"
                  onClick={() => {
                    router.push("/workspace/" + file._id);
                  }}
                >
                  {moment(file._creationTime).format("DD MM YYYY")}
                </td>
                <td
                  className="whitespace-nowrap px-4 py-2 text-gray-700"
                  onClick={() => {
                    router.push("/workspace/" + file._id);
                  }}
                >
                  {moment(file._creationTime).format("DD-MM-YYYY")}
                </td>
                <td
                  className="whitespace-nowrap px-4 py-2 text-gray-700"
                  onClick={() => {
                    router.push("/workspace/" + file._id);
                  }}
                >
                  <Image
                    className="rounded-full"
                    src={user?.picture}
                    alt="user"
                    width={30}
                    height={30}
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="flex gap-2"
                        onClick={() => handleDeleteFile(file._id)}
                      >
                        {" "}
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
