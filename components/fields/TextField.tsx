"use client"
import React from 'react'
import { ElementsType, FormElement } from '../FormElements';
import { MdTextFields } from "react-icons/md";
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
    designerComponent:()=><div>designerComponent</div>,
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