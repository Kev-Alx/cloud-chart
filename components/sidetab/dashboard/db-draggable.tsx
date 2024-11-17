"use client";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

type Props = {};

const DbDraggable = (props: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "chart",
    data: {
      val: "db-chart",
    },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      chart test
    </div>
  );
};

export default DbDraggable;
