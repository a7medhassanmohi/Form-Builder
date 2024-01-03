import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType =
  | "TextField"
//   | "TitleField"
//   | "SubTitleField"
//   | "ParagraphField"
//   | "SeparatorField"
//   | "SpacerField"
//   | "NumberField"
//   | "TextAreaField"
//   | "DateField"
//   | "SelectField"
//   | "CheckboxField";

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
  };

  export type FormElement = {
    type: ElementsType;
    designerBtnElement: {
        icon: React.ElementType;
        label: string;
      };
    construct: (id: string) => FormElementInstance;
    designerComponent:React.FC, //in designer
    formComponent:React.FC,  //in preview
    propertiesComponent:React.FC,
  }
  type FormElementsType = {
    [key in ElementsType]: FormElement;
  };

  export const FormElements: FormElementsType={
    TextField:TextFieldFormElement
  }