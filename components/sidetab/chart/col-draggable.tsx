import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { capitalize, cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

type Props = {
  column: { name: string; type: string };
  className?: string;
  IconComponent?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const ColDraggable = ({ column, className, IconComponent }: Props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: column.name + column.type,
    data: {
      val: column,
    },
  });

  return (
    <li
      className={cn("flex items-center gap-2", className)}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}
      {capitalize(column.name)}
    </li>
  );
};

export default ColDraggable;
