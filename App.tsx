import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/Home/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "./components/TabIcon";
import { NativeBaseProvider } from "native-base";
import GamesProvider from "./context/games";
import ManualInsertionProvider from "./context/manualInsertion";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <GamesProvider>
        <ManualInsertionProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  return (
                    <TabIcon
                      routeName={route.name}
                      focused={focused}
                      color={color}
                      size={size}
                    />
                  );
                },
              })}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Home" }}
              />
              <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{ title: "Histórico" }}
              />
            </Tab.Navigator>

            <StatusBar style="auto" />
          </NavigationContainer>
        </ManualInsertionProvider>
      </GamesProvider>
    </NativeBaseProvider>
  );
}
