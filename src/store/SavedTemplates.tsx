import { create } from "zustand";
import { persist } from "zustand/middleware";

const TEMPLATE_PREFIX = "saved-template";

interface SavedTemplates {
  selectedTemplate: string;
  savedTemplates: Record<string, string>;
  singleChange: (
    key: keyof SavedTemplates,
    value: string | Map<string, string> | string[]
  ) => void;
  saveTemplate: (templateKey: string, text: string) => void;
}

export const useSavedTemplateStore = create<SavedTemplates>()(
  persist(
    (set) => ({
      selectedTemplate: "",
      savedTemplates: {},
      singleChange: (key, value) =>
        set((state) => ({ ...state, [key]: value })),
      saveTemplate: (templateKey, text) => {
        set((state) => {
          const savedTemplates = {
            ...state.savedTemplates,
            [templateKey]: text,
          };
          localStorage.setItem(templateKey, text);
          return { ...state, savedTemplates };
        });
      },
    }),
    {
      name: "template-text-storage",
    }
  )
);

export function generateTemplateKey(title: string) {
  return `${TEMPLATE_PREFIX}-${title.replace(" ", "_")}`;
}

export function getAllLocalStorageItems() {
  const items: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key ?? "");
    if (key && key.startsWith(TEMPLATE_PREFIX) && value) {
      items[key] = value;
    }
  }
  return items;
}
