import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
  // Default assignment template for new assignments
  assignment: {
    _id: "newId",
    title: "New Assignment",
    course: "",
    description: "New Assignment Description",
    points: "100",
    dueDate: new Date().toISOString().split('T')[0],  // or null
    availableFrom: new Date().toISOString().split('T')[0],
    availableUntil: new Date().toISOString().split('T')[0],
  }
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload: assignments }) => {
      state.assignments = assignments;
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        ...state.assignment,  // Start with the current template
        ...assignment,  // Override with any payload fields
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },

    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any ;
    },

    // Reducer to set the current assignment being edited/created
    setAssignment: (state, { payload: assignment }) => {
      state.assignment = assignment;
    },

    // Reducer to update a specific field of the current assignment being edited/created
    updateAssignmentField: (state, { payload: { field, value }}) => {
      state.assignment = {
        ...state.assignment,
        [field]: value,  // Dynamically sets state.assignment.field's_value (computed property access)
      };
    },
  }
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, setAssignment, updateAssignmentField } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;