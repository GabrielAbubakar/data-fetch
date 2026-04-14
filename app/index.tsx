import { useFetch } from "@/api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const {
    data: users,
    loading,
    refetch,
  } = useFetch<User[]>("users?q=" + debouncedQuery);

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
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          onRefresh={refetch}
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
