import { View, Button, Text } from "react-native";

export default function HistoryScreen({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>History Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
