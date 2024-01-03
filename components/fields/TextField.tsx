"use client"
import React from 'react'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements';
import { MdTextFields } from "react-icons/md";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
type Props = {}
const type: ElementsType = "TextField";
const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeHolder: "Value here...",
  };
  
export const TextFieldFormElement: FormElement = {
    type,
    designerComponent:TextFieldDesignerComponent,
    formComponent:()=><div>formComponent</div>,
    propertiesComponent:()=><div>propertiesComponent</div>,
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
      },
      construct: (id: string) => ({
        id,
        type,
        extraAttributes,
      }),

}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function TextFieldDesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;

  return  <div className="flex flex-col gap-2 w-full">
  <Label>
    {required && "*"}
    {label}
  </Label>
  <Input readOnly disabled placeholder={placeHolder} />
  {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
</div>
}