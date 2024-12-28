import { ChangeEventHandler } from "react"
import { useTemplateStore } from "./store/TemplateStore"

export const TemplateInput = () => {


  const {input, variables, singleChange} = useTemplateStore()

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = ({target}) => {
    singleChange("input", target.value.replace(/\n/g, '  \n'))
    const vars = extractTemplateVariables(target.value)
    vars.forEach(key => {
      variables.set(key, variables.get(key) ?? "")
    })
    singleChange("currentKeys", vars)
    singleChange("variables", variables)
   
  }
  
  return (<div className="w-2/5">
    <textarea className="h-full w-full p-1" placeholder="Input Text Template" onChange={handleInputChange} value={input} />
  </div>)
}

function extractTemplateVariables(template: string): string[] {
  const regex = /\$\{(.*?)\}/g;
  const matches = [];
  let match;


  while ((match = regex.exec(template)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
}