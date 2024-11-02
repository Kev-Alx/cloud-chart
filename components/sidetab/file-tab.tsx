import React from "react";
import { Button } from "../ui/button";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";

type Props = {};

const files = [
  {
    name: "File 1",
    id: "f1",
  },
  {
    name: "File 2",
    id: "f2",
  },
  {
    name: "File 3",
    id: "f3",
  },
];

const FileTab = (props: Props) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-medium">Your files</h1>
        <Button variant={"ghost"} size={"icon"}>
          <FilePlus2 />
        </Button>
      </div>
      <ol>
        {files.map((file) => (
          <Link
            key={file.id + "key"}
            href={`/d/files/${file.id}`}
            className="hover:bg-white block transition-colors px-2 py-1 rounded-lg cursor-pointer"
          >
            <p>{file.name}</p>
            <p>3 Charts</p>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default FileTab;
