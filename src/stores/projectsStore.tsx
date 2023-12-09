//import types
import type { ReactFlowJsonObject } from "reactflow";

//import zustand
import { create } from "zustand";

//generic node and edge updater functions
type GenericUpdateFn<T> = (prev: T) => T;

export type Project = {
  id: string;
  name: string;
  flow: ReactFlowJsonObject;
};

type StoreState = {
  projects: Project[];
  fetchProjects: () => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (
    id: string,
    updatedProject: Project | GenericUpdateFn<Project>
  ) => void;
  saveProjects: () => void;
};

const useProjectsStore = create<StoreState>((set, get) => ({
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

  updateProject: (id, updatedProject) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? typeof updatedProject === "function"
            ? updatedProject(project)
            : updatedProject
          : project
      ),
    }));
    get().saveProjects();
  },

  saveProjects: () => {
    localStorage.setItem("projects", JSON.stringify(get().projects));
  },
}));

export default useProjectsStore;
