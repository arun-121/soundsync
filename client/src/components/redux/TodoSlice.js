import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todo: []

    },
    reducers: {
        addTodo: (state, action) => {
            state.todo.push(action.payload);
        },
        clearTodo: (state) => {
            state.todo = [];
        },
        removeFromTodo: (state, action) => {
            const toRemove = action.payload
            state.todo = [...state.todo.filter((e) => (e != toRemove))]
        }
    }
})


export const { addTodo, clearTodo, removeFromTodo } = todoSlice.actions;

export default todoSlice.reducer; 