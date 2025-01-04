import { TfiSave, TfiLayoutMediaOverlayAlt, TfiShortcode } from "react-icons/tfi";
import { useTemplateStore } from "./store/TemplateStore";
import { useSavedTemplateStore, getTemplateKey } from "./store/SavedTemplates";

export const EditorMenu = ({ textareaRef}: {textareaRef: React.RefObject<HTMLTextAreaElement>}) => {

  const { singleChange, input } = useTemplateStore()
  const { selectedTemplate, saveTemplate } = useSavedTemplateStore()

  const handleAddNewLine = () => {
    const cursor = textareaRef.current ? textareaRef.current.selectionStart : input.length
    singleChange("input", input.slice(0, cursor) + "\n&nbsp;\n" + input.slice(cursor))
    if(textareaRef.current) textareaRef.current.focus()
  }

  const handleAddNewVariable = () => {
    const cursor = textareaRef.current ? textareaRef.current.selectionStart : input.length
    singleChange("input", input.slice(0, cursor) + "${variable}" + input.slice(cursor))
    if(textareaRef.current) textareaRef.current.focus()
  }

  const handleSaveTemplate = () => {
    const key = getTemplateKey(selectedTemplate)
    saveTemplate(key, input)
  }

  return <div className="absolute right-0 p-2 flex gap-1.5 ">
    <button className=" flex px-3 py-2 rounded bg-slate-200 hover:bg-slate-300 gap-3" onClick={handleAddNewVariable}>
      <TfiShortcode className="m-auto" /> <span className="m-auto text-sm"> Add variable</span>
    </button>
    <button className=" flex px-3 py-2 rounded bg-slate-200 hover:bg-slate-300 gap-3" onClick={handleAddNewLine}>
      <TfiLayoutMediaOverlayAlt className="m-auto" /> <span className="m-auto text-sm"> Add new line</span>
    </button>
    <button 
      className="flex px-3 py-2 rounded bg-slate-200 hover:bg-slate-300 gap-3 disabled:cursor-not-allowed"
      disabled={!selectedTemplate}
      onClick={handleSaveTemplate}
    >
      <TfiSave className="m-auto" /> <span className="m-auto text-sm">Save template</span>
    </button>
  </div>
}
