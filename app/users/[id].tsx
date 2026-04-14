import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../../types";

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{ gap: 10 }}>
            <FontAwesome
              name="user-circle"
              size={128}
              color="black"
              style={{ alignSelf: "center", marginBottom: 20 }}
            />
            <DetailRow label="Name" value={user?.name || ""} />
            <DetailRow label="Email" value={user?.email || ""} />
            <DetailRow label="Phone" value={user?.phone || ""} />
            <DetailRow label="Website" value={user?.website || ""} />
            <DetailRow label="City" value={user?.address?.city || ""} />
            <DetailRow label="Company" value={user?.company?.name || ""} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
