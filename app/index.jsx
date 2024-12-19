import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white"
    >
      <Text className="text-5xl font-pextrabold">Edit app/index.tsx to edit this screen.</Text>
      <Link href="/weather" style={{color: '#ff1256'}}> Go to Weather Page </Link>
    </View>
  );
}