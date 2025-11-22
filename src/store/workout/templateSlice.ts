import { StateCreator } from "zustand";
import { WorkoutTemplate } from "../../types/workout";
import { StoreState } from "./useWorkoutStore";

export interface TemplateSlice {
  templates: WorkoutTemplate[];
  setTemplates: (templates: WorkoutTemplate[]) => void;
  addTemplate: (template: WorkoutTemplate) => void;
  loadTemplate: (templateId: string) => void;
}

export const createTemplateSlice: StateCreator<StoreState, [], [], TemplateSlice> = (set, get) => ({
  templates: [],

  setTemplates: (templates) => set({ templates }),

  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, { ...template, createdAt: Date.now() }],
    })),

  loadTemplate: (templateId) => {
    const template = get().templates.find((t) => t.id === templateId);
    if (!template) return;
    set({
      activeWorkout: {
        id: Date.now().toString(),
        name: template.name,
        startTime: Date.now(),
        exercises: template.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.map((s) => ({ ...s, complete: false })),
        })),
        completed: false,
        fromTemplate: templateId,
      },
    });
  },
});
