import React from "react";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  column: { name: string; type: string };
  className?: string;
};

const ColDraggable = ({ column, className }: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: column.name + column.type,
    data: {
      val: column,
    },
  });

  return (
    <li className={className} ref={setNodeRef} {...listeners} {...attributes}>
      {column.name}
    </li>
  );
};

export default ColDraggable;
