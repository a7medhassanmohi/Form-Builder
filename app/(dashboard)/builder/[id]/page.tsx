import { GetFormById } from '@/actions/form';
import FormBuilder from '@/components/FormBuilder';
import React from 'react'
interface Props{
  params:{
    id:string
  }
}
const BuilderPage = async ({params}:Props) => {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <FormBuilder form={form} />
  )
}

export default BuilderPage