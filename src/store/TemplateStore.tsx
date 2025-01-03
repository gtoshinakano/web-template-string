import { create } from "zustand";

interface TemplateTextStore {
  input: string;
  variables: Map<string, string>;
  singleChange: (
    key: keyof TemplateTextStore,
    value: string | Map<string, string> | string[]
  ) => void;
  setVariables: (key: string, value: string) => void;
  currentKeys: string[];
}

export const useTemplateStore = create<TemplateTextStore>()((set) => ({
  input: "",
  variables: new Map<string, string>(),
  currentKeys: [],
  singleChange: (key, value) => set((state) => ({ ...state, [key]: value })),
  setVariables: (key, value) =>
    set((state) => {
      const newMap = state.variables || new Map();
      newMap.set(key, value);
      return { ...state, variables: newMap };
    }),
}));
