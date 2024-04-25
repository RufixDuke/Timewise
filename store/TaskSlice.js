import { createSlice } from "@reduxjs/toolkit";
import { calculateTimeRemaining } from "../utils";

const initialState = {
  tasks: [], // Array to store alarms
};

const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks(state, action) {
      state.tasks.push(action.payload); // Add the new alarm object to the array
    },
    // Reducer to update time remaining for all alarms
    updateTimeRemaining(state) {
      state.alarms.forEach((alarm) => {
        alarm.timeRemaining = calculateTimeRemaining(alarm.time);
      });
    },
    updateTaskActiveStatus(state, action) {
      const { id, isActive } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.active = isActive;
      }
    },
  },
});

export const { addTasks, updateTimeRemaining, updateTaskActiveStatus } =
  TaskSlice.actions;

export default TaskSlice.reducer;
