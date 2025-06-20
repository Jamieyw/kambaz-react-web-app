import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: " 2", title: "Learn Node" },
  ],
  todo: { title: "Learn Mango" },
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodos = [
          ...state.todos,
        { ...action.payload, id: new Date().getTime().toString() },
      ];
      state.todos = newTodos;
      state.todo = { title: "" };  // clear todo
    },

    deleteTodo: (state, action) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
    },

    updateTodo: (state, action) => {
      const newTodos = state.todos.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.todos = newTodos;
      state.todo = { title: "" };      
    },

    setTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
});

// export reducer functions
export const { addTodo, deleteTodo, updateTodo, setTodo } = todoSlice.actions;
// export reducer for store
export default todoSlice.reducer;