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
import { LuHeading1, LuHeading2 } from "react-icons/lu";
type Props = {};
const type: ElementsType = "SubTitleField";
const extraAttributes = {
  title: "sub title field",
};
const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SubTitleFieldFormElement: FormElement = {
  type,
  designerComponent: SubTitleFieldDesignerComponent,
  formComponent: SubTitleFieldFormComponent,
  propertiesComponent: SubTitleFieldPropertiesComponent,
  designerBtnElement: {
    icon: LuHeading2,
    label: "subTitle field",
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

function SubTitleFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
    <Label className="text-muted-foreground">sub Title field</Label>
    <p className="">{title}</p>
  </div>
  );
}

function SubTitleFieldPropertiesComponent({
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
  title:element.extraAttributes.title,
    },
  });
  function applyChanges(values: propertiesFormSchemaType) {
    const {title} = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
     title
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
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

function SubTitleFieldFormComponent({
  elementInstance,
 
}: {
  elementInstance: FormElementInstance;
  
}){
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttributes;
  return <p className="">{title}</p>
}