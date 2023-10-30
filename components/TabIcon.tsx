import Ionicons from "@expo/vector-icons/Ionicons";

type TabIconProps = {
  routeName: string;
  focused: boolean;
  color: string;
  size: number;
};

export default function TabIcon({ routeName, focused, color, size }: TabIconProps) {
  let iconName: 'home' | 'home-outline' | 'refresh' | 'refresh-outline';

  if (routeName === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else {
    iconName = focused ? "refresh" : "refresh-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}
