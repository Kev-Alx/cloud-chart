"use client";

import React from "react";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

type Props = {};

const NavBreadcrumb = (props: Props) => {
  return (
    <>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbPage>Inbox</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
};

export default NavBreadcrumb;
