import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";

const WorkSpaceHeader = ({onSave} : any) => {
  return (
    <div className="p-2 border-b flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <Image src="/logo-1.png" alt="logo" width={40} height={40} />
        <h2 className="">FileName</h2>
      </div>
      <div className="flex items-center flex-row gap-4">
        <Button
          className="flex gap-1 bg-yellow-500  h-8 hover:bg-yellow-600 text-[12px]"
          onClick={() => onSave()}
        >
          Save
          <Save className="h-4 w-4" />{" "}
        </Button>
        <Button className="flex gap-1 bg-blue-600  h-8 hover:bg-blue-700 text-[12px]">
          Share
          <Link className="h-4 w-4" />{" "}
        </Button>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
