import { useTemplateStore } from "./store/TemplateStore"

export const SideMenu = () => {

  const { variables, currentKeys } = useTemplateStore()


  const varItems =Array.from(variables.entries()).filter(([key]) => currentKeys.includes(key)) ?? []

  return (<div className="flex flex-col grow">
    <div className="p-1.5">
      {varItems.map(([key, value]) => <ValueInput key={key} value={value} varKey={key} />)}
    </div>
  </div>)
}

const ValueInput = ({value, varKey}: { value: string; varKey: string }) => {

  const { setVariables } = useTemplateStore()

  return (
    <div className="flex flex-col">
      <small>{varKey}</small>
      <input className="bg-gray-100" type="text" value={value} onChange={e => setVariables(varKey, e.target.value)} />
    </div>
  )
}