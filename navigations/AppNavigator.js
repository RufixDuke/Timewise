import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabStack from "./tabs";
import CreateAlarm from "../screens/Tasks/CreateAlarm";
import SuccessScreen from "../screens/Tasks/SuccessScreen";
import Task from "../screens/Tasks";
import CreateTask from "../screens/Tasks/CreateTask";
import SleepTargetScreen from "../screens/Settings/SleepTargetScreen";
import StartTaskScreen from "../screens/Home/StartTaskScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={TabStack} />
      <Stack.Screen name="CreateAlarm" component={CreateAlarm} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="Alarm" component={Task} />
      <Stack.Screen name="SleepTargetScreen" component={SleepTargetScreen} />
      <Stack.Screen name="StartTaskScreen" component={StartTaskScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
