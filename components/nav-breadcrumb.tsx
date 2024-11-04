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
        <>
          <BreadcrumbItem className="hidden md:block" key={path + "ko"}>
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
          <BreadcrumbSeparator key={path + "sep"} className="hidden md:block" />
        </>
      ))}

      <BreadcrumbItem>
        <BreadcrumbPage>{capitalize("" + last)}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
};

export default NavBreadcrumb;
