import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../../context/UserContext";
import MovieCard from "../components/MovieCard";
import TVShowCard from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const UserScreen = () => {
  const { username, updateUsername, watched, setWatched, toWatch, setToWatch } =
    useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
  };

  const handleAddToWatched = (item) => {
    setWatched((prev) => [...prev, item]);
    setToWatch((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleAddToToWatch = (item) => {
    setToWatch((prev) => [...prev, item]);
    setWatched((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleRemoveFromWatched = (item) => {
    setWatched((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleRemoveFromToWatch = (item) => {
    setToWatch((prev) => prev.filter((i) => i.id !== item.id));
  };

  const renderItem = (item, listType) => {
    const isWatched = listType === "watched";
    const isToWatch = listType === "toWatch";

    return (
      <View style={styles.cardContainer} key={item.id}>
        {item.title ? (
          <MovieCard
            movie={item}
            onPress={() => router.push(`/details?movieId=${item.id}`)}
          />
        ) : (
          <TVShowCard
            show={item}
            onPress={() => router.push(`/details?tvShowId=${item.id}`)}
          />
        )}

        <View style={styles.cardActions}>
          {isToWatch && !isWatched && (
            <TouchableOpacity onPress={() => handleAddToToWatch(item)}>
              <MaterialIcons name="check-circle" size={24} color={"#000000"} />
            </TouchableOpacity>
          )}
          {isWatched && !isToWatch && (
            <TouchableOpacity onPress={() => handleRemoveFromWatched(item)}>
              <MaterialIcons name="remove-circle" size={24} color={"#000000"} />
            </TouchableOpacity>
          )}
          {isWatched && !isToWatch && (
            <TouchableOpacity onPress={() => handleAddToToWatch(item)}>
              <MaterialIcons
                name="remove-circle-outline"
                size={24}
                color={"#000000"}
              />
            </TouchableOpacity>
          )}
          {isToWatch && !isWatched && (
            <TouchableOpacity onPress={() => handleRemoveFromToWatch(item)}>
              <MaterialIcons
                name="check-circle-outline"
                size={24}
                color={"#000000"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topPadding} />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {isEditing ? (
            <TextInput
              style={styles.usernameInput}
              value={newUsername}
              onChangeText={setNewUsername}
              onSubmitEditing={handleSavePress}
              returnKeyType="done"
            />
          ) : (
            <Text style={styles.username}>Hi {username} !!</Text>
          )}

          <TouchableOpacity
            onPress={isEditing ? handleSavePress : handleEditPress}
          >
            <MaterialIcons
              name={isEditing ? "check" : "edit"}
              size={24}
              color={"#000000"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.section}>Watched Movies and Shows</Text>

      {watched && watched.length > 0 ? (
        <Carousel
          data={watched}
          renderItem={({ item }) => renderItem(item, "watched")}
        />
      ) : (
        <Text style={styles.noItemsText}>No watched Movies or Shows</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  username: {
    fontSize: 35,
    fontWeight: "bold",
    marginRight: 8,
  },

  usernameInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
    borderBottomWidth: 1,
    flex: 1,
  },

  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    marginVertical: 8,
  },

  noItemsText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },

  cardContainer: {
    marginBottom: 16,
  },

  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
});

export default UserScreen;
