"use client"
import { cn } from "@/lib/utils";
import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
type Props = {};

const Designer = (props: Props) => {
    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
          isDesignerDropArea: true,
        },
      });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
        ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset",
          )}
        >
            {!droppable.isOver &&  (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop here</p>
          )}
           {droppable.isOver &&  (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;