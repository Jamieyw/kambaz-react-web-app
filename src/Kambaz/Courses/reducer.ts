import { createSlice } from "@reduxjs/toolkit";
import { courses as dbCourses } from "../Database";

const initialState = {
  courses: dbCourses,
  // Default course template for new courses
  course: {
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D000",
    credits: 3,
    description: "New Description",
  }
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        ...state.course,
        ...course,
      };
      state.courses = [...state.courses, newCourse];
    },

    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (c: any) => c._id !== courseId
      );
    },

    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      );
    },

    setCourse: (state, { payload: course }) => {
      state.course = course;
    },
  }
});

export const { addCourse, deleteCourse, updateCourse, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;