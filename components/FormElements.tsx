import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";

export type SubmitFunction=(key: string, value: string)=>void
export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
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
    designerComponent:React.FC<{
        elementInstance:FormElementInstance
    }>, //in designer
    formComponent:React.FC<{
      elementInstance:FormElementInstance,
      submitValue?:SubmitFunction,
      isInvalid?:boolean,
      defaultValue:string
    }>,  //in preview
    propertiesComponent:React.FC<{
      elementInstance:FormElementInstance
    }>,
    validate: (formElement: FormElementInstance, currentValue: string) => boolean;
  }
  type FormElementsType = {
    [key in ElementsType]: FormElement;
  };

  export const FormElements: FormElementsType={
    TextField:TextFieldFormElement,
    TitleField:TitleFieldFormElement,
    SubTitleField:SubTitleFieldFormElement,
  }