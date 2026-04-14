import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../types";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?q=${query}`,
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
          }}
          placeholder="Search by user name"
          onChangeText={setQuery}
          value={query}
        />

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
              onPress={() => router.push(`/users/${item.id}` as any)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchUsers} />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return <ActivityIndicator size="large" />;
            }
            return <Text>No users found</Text>;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
