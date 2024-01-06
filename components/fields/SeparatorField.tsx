"use client";
import React, { useEffect, useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { RiSeparator } from "react-icons/ri";

import { Separator } from "../ui/separator";
type Props = {};
const type: ElementsType = "SeparatorField";


export const SeparatorFieldFormElement: FormElement = {
  type,
  designerComponent: SeparatorFieldDesignerComponent,
  formComponent: SeparatorFieldFormComponent,
  propertiesComponent: SeparatorFieldPropertiesComponent,
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator field",
  },
  construct: (id: string) => ({
    id,
    type,
  }),
  validate: (formElement: FormElementInstance, currentValue: string): boolean => true
};



function SeparatorFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
    <Label className="text-muted-foreground">Separator field</Label>
    <Separator />
  </div>
  );
}

function SeparatorFieldPropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <p>No properties for this element</p>;
}

function SeparatorFieldFormComponent({
  elementInstance,
 
}: {
  elementInstance: FormElementInstance;
  
}){

  return <Separator />;
}