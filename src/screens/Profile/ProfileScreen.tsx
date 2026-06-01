import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { useProfile } from "../../hooks/useProfile";
import Loader from "../../components/Loader/Loader";

const ProfileScreen = () => {
  const { profile, loading } = useProfile();

  if (loading || !profile) return <Loader />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.photo }} style={styles.photo} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.info}>{profile.email}</Text>
        <Text style={styles.info}>{profile.phone}</Text>
        <Text style={styles.info}>{profile.address}</Text>
        <Text style={styles.info}>
          {profile.city}, {profile.country} - {profile.pincode}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
});

export default ProfileScreen;
