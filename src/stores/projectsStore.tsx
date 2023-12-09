//import types
import type { ReactFlowJsonObject } from "reactflow";

//import zustand
import { create } from "zustand";

//generic node and edge updater functions
type GenericUpdateFn<T> = (prev: T) => T;

type Project = {
  id: string;
  name: string;
  flow: ReactFlowJsonObject;
};

type StoreState = {
  projects: Project[];
  fetchProjects: () => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  saveProjects: () => void;
};

export const useProjectsStore = create<StoreState>((set, get) => ({
  projects: [],

  fetchProjects: () => {
    const projects = localStorage.getItem("projects");

    if (projects) {
      set(() => ({ projects: JSON.parse(projects) }));
    }
  },

  addProject: (project) => {
    set((state) => ({ projects: [...state.projects, project] }));
    get().saveProjects();
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    }));
    get().saveProjects();
  },

  saveProjects: () => {
    localStorage.setItem("projects", JSON.stringify(get().projects));
  },
}));
