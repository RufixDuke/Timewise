import { createSlice } from "@reduxjs/toolkit";
import { calculateTimeRemaining } from "../utils";

const initialState = {
  alarms: [], // Array to store alarms
};

const AlarmsSlice = createSlice({
  name: "alarms",
  initialState,
  reducers: {
    addAlarm(state, action) {
      state.alarms.push(action.payload);
    },
    updateAlarmActiveStatus(state, action) {
      const { id, active } = action.payload;
      const alarmToUpdate = state.alarms.find((task) => task.id === id);
      if (alarmToUpdate) {
        alarmToUpdate.active = active;
      }
    },
    updateTimeRemaining(state) {
      state.alarms.forEach((alarm) => {
        alarm.timeRemaining = calculateTimeRemaining(alarm.time);
      });
    },
  },
});

export const { addAlarm, updateTimeRemaining, updateAlarmActiveStatus } =
  AlarmsSlice.actions;

export default AlarmsSlice.reducer;
