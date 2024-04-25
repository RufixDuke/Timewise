import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  target: null,
  to: null,
  from: null,
  ringtone: "",
  ringtoneName: "",
  winddown: "",
};

const SleepTargetSlice = createSlice({
  name: "sleep",
  initialState,
  reducers: {
    // Reducer to add an alarm
    setTarget(state, action) {
      state.target = action.payload; // Add the new alarm object to the array
    },
    setTo(state, action) {
      state.to = action.payload;
    },
    setFrom(state, action) {
      state.from = action.payload;
    },
    setRingTone(state, action) {
      state.ringtone = action.payload;
    },
    setRingToneName(state, action) {
      state.ringtoneName = action.payload;
    },
    setWindDown(state, action) {
      state.winddown = action.payload;
    },
  },
});

export const {
  setTarget,
  setFrom,
  setTo,
  setRingTone,
  setWindDown,
  setRingToneName,
} = SleepTargetSlice.actions;

export default SleepTargetSlice.reducer;
