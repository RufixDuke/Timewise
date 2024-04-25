import { createSlice } from "@reduxjs/toolkit";
import { calculateTimeRemaining } from "../utils";

const initialState = {
  alarms: [], // Array to store alarms
};

const AlarmsSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    // Reducer to add an alarm
    addAlarm(state, action) {
      state.alarms.push(action.payload); // Add the new alarm object to the array
    },
    // Reducer to update time remaining for all alarms
    updateTimeRemaining(state) {
      state.alarms.forEach((alarm) => {
        // Calculate time remaining for each alarm and update the corresponding property
        // You can use the logic from the previous example to calculate time remaining
        // For simplicity, let's assume the time remaining is calculated elsewhere and provided as a property
        // Replace 'timeRemaining' with the actual property name containing the time remaining
        alarm.timeRemaining = calculateTimeRemaining(alarm.time);
      });
    },
  },
});

export const { addAlarm, updateTimeRemaining } = AlarmsSlice.actions;

export default AlarmsSlice.reducer;
