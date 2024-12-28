import { useTemplateStore } from "./store/TemplateStore"

export const Output = () => {

  const { input, variables } = useTemplateStore()

    let resultString = ""
    try {
      // Use template literals dynamically
      resultString = input.replace(/\$\{(.*?)\}/g, (_, key) => {
        return variables.get(key.trim()) ?? `\${${key}}`;
      });
    } catch (error) {
      console.error(error);
      return <i>ERROR</i>
    }
  
  
  return <div className="bg-blue-300 w-2/5">
    {resultString}
  </div>
}