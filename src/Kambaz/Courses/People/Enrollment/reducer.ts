import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },

    addEnrollment: (state, action) => {
      const enrollments = state.enrollments as any;
      enrollments.push(action.payload);
    },

    removeEnrollment: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { setEnrollments, addEnrollment, removeEnrollment } =
  enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;