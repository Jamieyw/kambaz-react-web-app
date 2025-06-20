import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload: modules }) => {
     state.modules = modules;
   },

    addModule: (state, { payload: module }) => {
      // Use the module directly from the payload, which already contains the server-generated _id
      const newModule: any = {
        ...module, // module already has _id, name, course
        lessons: [], // Ensure lessons array is initialized if not present from server
      };
      state.modules = [...state.modules, newModule] as any;
    },

    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },

    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },

    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
