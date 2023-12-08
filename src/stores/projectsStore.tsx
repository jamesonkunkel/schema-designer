import { create } from "zustand";

type Project = {
  id: string;
  name: string;
};

type StoreState = {
  projects: Project[];
  fetchProjects: () => void;
  addProject: (project: Project) => void;
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

  saveProjects: () => {
    localStorage.setItem("projects", JSON.stringify(get().projects));
  },
}));
