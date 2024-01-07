
"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useTheme } from 'next-themes'
type Props = {}

const SelectTheme = (props: Props) => {
    const [generalTheme, setGeneralTheme] = useState(()=>{
        let userTheme=undefined
        if(window){
            userTheme= localStorage.getItem("generalTheme")
        }
        return userTheme || "yellow"
    })
  const { theme, setTheme } = useTheme();
    useEffect(() => {
        let userTheme=localStorage.getItem("generalTheme")
        localStorage.setItem("generalTheme",userTheme || generalTheme)
    document.documentElement.className=`${generalTheme} ${theme}`

    }, [generalTheme,theme])

    useEffect(() => {
 

    }, [])
    
  return (
    <Select onValueChange={(e)=>{
        setGeneralTheme(e)
        localStorage.setItem("generalTheme",e)
    }} defaultValue={generalTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="yellow">yellow</SelectItem>
          <SelectItem value="zinc">zinc</SelectItem>
          <SelectItem value="slate">slate</SelectItem>
          <SelectItem value="stone">stone</SelectItem>
          <SelectItem value="gray">gray</SelectItem>
          <SelectItem value="neutral">neutral</SelectItem>
          <SelectItem value="red">red</SelectItem>
          <SelectItem value="rose">rose</SelectItem>
          <SelectItem value="orange">orange</SelectItem>
          <SelectItem value="green">green</SelectItem>
          <SelectItem value="blue">blue</SelectItem>
          <SelectItem value="violet">violet</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectTheme