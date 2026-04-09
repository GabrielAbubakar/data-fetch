import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../types";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 50,
        }}
      >
        <Text style={{ fontSize: 34, fontWeight: "bold", marginBottom: 20 }}>
          Users
        </Text>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            contentContainerStyle={{
              gap: 10,
              flex: 1,
            }}
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                hitSlop={10}
                onPress={() =>
                  router.push({
                    pathname: "/user-details",
                    params: { id: item.id },
                  })
                }
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchUsers} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
