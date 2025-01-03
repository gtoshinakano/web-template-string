import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TemplateTextStore {
  selectedTemplate: string;
  savedTemplates: Record<string, string>;
  singleChange: (key: keyof TemplateTextStore, value: string | Map<string, string> | string[]) => void;
  saveTemplate: (templateKey: string, text: string ) => void;
}

export const useTemplateStore = create<TemplateTextStore>()(
  persist(
    (set) => ({
      selectedTemplate: "",
      savedTemplates: {},
      singleChange: (key, value) =>
        set((state) => ({ ...state, [key]: value })),
      saveTemplate: (templateKey, text) => {
        set((state) => {
          const savedTemplates = { ...state.savedTemplates, [templateKey]: text }
          return { ...state, savedTemplates}
        })
      },
    }),
    {
      name: "template-text-storage",
    }
  )
);
