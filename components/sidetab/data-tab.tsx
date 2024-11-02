import React from "react";
import { Button } from "../ui/button";
import { CloudUpload } from "lucide-react";
import { SidebarSeparator } from "../ui/sidebar";
import { url } from "inspector";
import Link from "next/link";

type Props = {};
const data = [
  {
    name: "Dataset 1",
    url: "/d/data/dataset-1",
  },
  {
    name: "Dataset 2",
    url: "/d/data/dataset-2",
  },
  {
    name: "Dataset 3",
    url: "/d/data/dataset-3",
  },
];
const DataTab = (props: Props) => {
  return (
    <div className="p-4">
      <h1 className="font-medium">Your datas</h1>
      <SidebarSeparator className="mt-1 mb-4" />
      <Button className="w-full" variant={"outline"}>
        Upload data <CloudUpload />
      </Button>
      <ul className="space-y-2 py-2">
        {data.map((data, i) => (
          <Link
            href={data.url}
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
