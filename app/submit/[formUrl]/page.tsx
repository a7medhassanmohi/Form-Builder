import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {

  const form = await GetFormContentByUrl(params.formUrl);
  const formContent = JSON.parse(form.content) as FormElementInstance[];

  if (!form) {
    throw new Error("form not found");
  }

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
