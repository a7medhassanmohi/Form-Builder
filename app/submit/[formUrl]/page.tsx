import { FormElementInstance } from "@/components/FormElements";
import React from "react";

async function SubmitPage({
  params,
}: {
  params: {
    formUrl: string;
  };
}) {



  return <div>{params.formUrl}</div>;
}

export default SubmitPage;
