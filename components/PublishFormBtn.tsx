import React from 'react'
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

type Props = {
    id: number

}

const PublishFormBtn = (props: Props) => {
  return (
    <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
  )
}

export default PublishFormBtn