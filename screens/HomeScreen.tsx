import { View, Button, Text } from "react-native";

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to History"
        onPress={() => navigation.navigate("History")}
      />
    </View>
  );
}
