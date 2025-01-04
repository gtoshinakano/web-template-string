import { create } from "zustand";

const TEMPLATE_PREFIX = "saved-template-";

interface SavedTemplatesStore {
  selectedTemplate: string;
  savedTemplates: Record<string, string>;
  singleChange: (
    key: keyof SavedTemplatesStore,
    value: string | Map<string, string> | string[]
  ) => void;
  saveTemplate: (templateKey: string, text: string) => void;
  refetchSavedTemplates: () => void;
  deleteTemplate: (templateKey: string) => void
}

export const useSavedTemplateStore = create<SavedTemplatesStore>()((set) => ({
  selectedTemplate: "",
  savedTemplates: {},
  singleChange: (key, value) => set((state) => ({ ...state, [key]: value })),
  saveTemplate: (templateKey, text) => {
    set((state) => {
      localStorage.setItem(templateKey, text);
      return { ...state, savedTemplates: {
        ...state.savedTemplates,
        [templateKey]: text,
      } };
    });
  },
  refetchSavedTemplates: () =>
    set({ savedTemplates: getAllLocalStorageTemplates() }),
  deleteTemplate: (templateKey) => {
    localStorage.removeItem(templateKey)
    set({ savedTemplates: getAllLocalStorageTemplates() })
  }
}));

export function getTemplateKey(title: string) {
  return `${TEMPLATE_PREFIX}${title.trim()}`;
}

export function getTemplateTitle(title: string) {
  return title.replace(TEMPLATE_PREFIX, "");
}

export function getAllLocalStorageTemplates() {
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
