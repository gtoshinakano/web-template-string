import { SavedTemplatesDrawer } from "./SavedTemplatesDrawer"
import { useSavedTemplateStore } from "./store/SavedTemplates"

export const NavMenu = () => {

  const { selectedTemplate, singleChange } = useSavedTemplateStore()

  return <nav className="bg-yellow-400 w-full flex">
    <h1 className="w-1/3 p-3 font font-semibold text-2xl">{'${text} editor'}</h1>
    <div className="w-1/3 p-3 h-full flex font font-semibold justify-center">
      <input
        className="bg-transparent text-center my-auto p-1 w-full" 
        type="text"
        onChange={({target}) => singleChange("selectedTemplate", target.value)} 
        value={selectedTemplate}
        placeholder="Untitled"
      />
    </div> 
    <div className="w-1/3 p-3 font font-semibold text-right"><SavedTemplatesDrawer /></div> 
  </nav>
}

