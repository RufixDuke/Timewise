import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks(state, action) {
      state.tasks.push(action.payload);
    },
    updateTaskActiveStatus(state, action) {
      const { id, active, completed } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.active = active;
        taskToUpdate.completed = completed;
      }
    },
    deleteTask(state, action) {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const {
  addTasks,
  updateTimeRemaining,
  updateTaskActiveStatus,
  deleteTask,
} = TaskSlice.actions;

export default TaskSlice.reducer;
