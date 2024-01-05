"use client"
import React, { useCallback, useRef, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { ImSpinner2 } from "react-icons/im";
import { HiCursorClick } from "react-icons/hi";

type Props = {
  formUrl: string;
  content: FormElementInstance[];
};

const FormSubmitComponent = ({ content, formUrl }: Props) => {
    const formValues = useRef<{ [key: string]: string }>({});
    const [pending, startTransition] = useTransition();
    const submitValue =(key: string, value: string) => {
        formValues.current[key] = value;
      };
      const submitForm = async () => {
        console.log(formValues.current);
        
      }
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return <FormElement key={element.id} elementInstance={element} submitValue={submitValue} />;
        })}
         <Button
          className="mt-8"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
