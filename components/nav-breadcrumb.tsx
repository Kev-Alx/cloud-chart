"use client";

import React from "react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils";

const NavBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").slice(1);
  const last = paths.pop();
  const fileId = paths.length > 2 ? paths.at(2) : null;

  return (
    <>
      {paths.map((path) => (
        <div key={path + "link"} className="flex items-center gap-2">
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink
              href={
                path === "d"
                  ? "/d/files"
                  : fileId
                  ? "/d/files/" + fileId
                  : "/d/" + path
              }
            >
              {path === "d" ? "Dashboard" : capitalize(path)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
        </div>
      ))}

      <BreadcrumbItem>
        <BreadcrumbPage>{capitalize("" + last)}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
};

export default NavBreadcrumb;
