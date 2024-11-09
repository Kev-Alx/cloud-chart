import React from "react";
import { Button } from "../../ui/button";
import { CloudUpload } from "lucide-react";
import { SidebarSeparator } from "../../ui/sidebar";
import Link from "next/link";
import { mockProjectData } from "@/lib/constants";

type Props = {
  fileId: string[];
};

const DataTab = ({ fileId }: Props) => {
  return (
    <div className="p-4">
      <h1 className="font-medium">Your datas</h1>
      <SidebarSeparator className="mt-1 mb-4" />
      <Button className="w-full" variant={"outline"}>
        Upload data <CloudUpload />
      </Button>
      <ul className="space-y-2 py-2">
        {mockProjectData.map((data, i) => (
          <Link
            href={`/d/files/file-${fileId[i]}/data/data-${i}`}
            key={i + "ko"}
            className="hover:bg-white block transition-colors px-2 py-1 rounded-lg cursor-pointer"
          >
            {data.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DataTab;
