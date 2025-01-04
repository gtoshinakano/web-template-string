import { useState, useEffect } from "react";
import { TfiViewListAlt, TfiClose, TfiTrash } from "react-icons/tfi";
import {
  getTemplateTitle,
  useSavedTemplateStore,
} from "./store/SavedTemplates";
import { useTemplateStore } from "./store/TemplateStore";

export const SavedTemplatesDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { savedTemplates, refetchSavedTemplates, deleteTemplate, singleChange } =
    useSavedTemplateStore();
  const { singleChange: setInput } = useTemplateStore()

  useEffect(() => {
    refetchSavedTemplates();
  }, []);

  const handleSelectTemplate = (key: string) => () => {
    singleChange("selectedTemplate", getTemplateTitle(key))
    setInput("input", savedTemplates[key])
    setIsOpen(false)
  }

  return (
    <>
      <button
        className="px-2 py-2.5 bg-yellow-500 text-lg rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TfiViewListAlt />
      </button>
      {isOpen && (
        <>
          <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black transition-all duration-100 bg-opacity-50 z-10`}
            onClick={() => setIsOpen(false)}
          />
          <aside
            className={`fixed top-0 right-0 z-20 min-w-96 bg-white flex flex-col h-screen overflow-hidden text-left`}
          >
            <div className="flex w-full">
              <h2 className="text-lg p-5 grow">Locally Saved Templates</h2>
              <button className="pr-5" onClick={() => setIsOpen(false)}>
                <TfiClose />
              </button>
            </div>
            {Object.entries(savedTemplates).map(([key]) => (
              <div
                key={key}
                className="flex border-b text-sm text-slate-900 font-light"
              >
                <button 
                  className="truncate pl-4 pr-2 py-3 my-auto grow text-left hover:bg-slate-200"
                  onClick={handleSelectTemplate(key)}
                >
                  {getTemplateTitle(key)}
                </button>
                <button
                  className="p-4 hover:bg-slate-200"
                  onClick={() => deleteTemplate(key)}
                >
                  <TfiTrash />
                </button>
              </div>
            ))}
          </aside>
        </>
      )}
    </>
  );
};
