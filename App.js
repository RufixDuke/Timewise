import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import useFonts from "./hooks/useFonts";
import store, { persistor } from "./store";
import RootNavigation from "./navigations/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./hooks/useTheme";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const appIsReady = useFonts();

  if (!appIsReady) {
    return null;
  }
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
