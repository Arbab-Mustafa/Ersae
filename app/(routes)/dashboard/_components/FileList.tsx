import { FileListContext } from "@/app/_context/FileListContext";
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Archive, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

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
                onClick={() => {
                  router.push("/workspace/" + file._id);
                }}
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format("DD MM YYYY")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {moment(file._creationTime).format("DD-MM-YYYY")}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
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
                      <DropdownMenuItem className="flex gap-2">
                        {" "}
                        <Archive className="w-4 h-4" /> Archieve
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
