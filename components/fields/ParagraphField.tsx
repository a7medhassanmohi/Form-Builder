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
import { Textarea } from "../ui/textarea";
import { BsTextParagraph } from "react-icons/bs";
type Props = {};
const type: ElementsType = "ParagraphField";
const extraAttributes = {
  text: "Paragraph Field",
};
const propertiesSchema = z.object({
  text: z.string().min(2).max(50),
});
type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const ParagraphFieldFormElement: FormElement = {
  type,
  designerComponent: ParagraphFieldDesignerComponent,
  formComponent: ParagraphFieldFormComponent,
  propertiesComponent: ParagraphFieldPropertiesComponent,
  designerBtnElement: {
    icon: BsTextParagraph,
    label: "Paragraph field",
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

function ParagraphFieldDesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
    <Label className="text-muted-foreground">Paragraph Field</Label>
    <p className="truncate">{text}</p>
  </div>
  );
}

function ParagraphFieldPropertiesComponent({
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
    text:element.extraAttributes.text,
    },
  });
  function applyChanges(values: propertiesFormSchemaType) {
    const {text} = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        text
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Textarea
                rows={5}
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

function ParagraphFieldFormComponent({
  elementInstance,
 
}: {
  elementInstance: FormElementInstance;
  
}){
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return <p className="truncate">{text}</p>
}