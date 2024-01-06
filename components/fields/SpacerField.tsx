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
import { LuHeading1, LuHeading2, LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";
type Props = {};
const type: ElementsType = "SpacerField";
const extraAttributes = {
  height: 20, // px
};
const propertiesSchema = z.object({
  height: z.number().min(2).max(200),
});
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SpacerFieldFormElement: FormElement = {
  type,
  designerComponent: SpacerFieldDesignerComponent,
  formComponent: SpacerFieldFormComponent,
  propertiesComponent: SpacerFieldPropertiesComponent,
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Field ",
  },
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  validate: (formElement: FormElementInstance, currentValue: string): boolean => true
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function SpacerFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
    <Label className="text-muted-foreground">Spacer field: {height}px</Label>
    <LuSeparatorHorizontal className="h-8 w-8" />
  </div>
  );
}

function SpacerFieldPropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
  height:element.extraAttributes.height,
    },
  });
  function applyChanges(values: propertiesFormSchemaType) {
    const {height} = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height
      },
    });
  }

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);
  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px): {form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function SpacerFieldFormComponent({
  elementInstance,
 
}: {
  elementInstance: FormElementInstance;
  
}){
  const element = elementInstance as CustomInstance;

  const { height } = element.extraAttributes;
  return <div style={{ height, width: "100%" }}></div>;
}