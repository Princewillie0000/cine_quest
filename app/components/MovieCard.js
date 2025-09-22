import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.shadowContainer}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: movie.poster_path }}
            style={styles.cover}
          />
          <Card.Content style={styles.content}>
            <Text variant="titleMedium" style={styles.title}>
              {movie.title}
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              Rating:{movie.vote_average}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    margin: 8,
  },
  shadowContainer: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  card: {
    // flex: 1,
    borderRadius: 8,
    width: 150,
    height: 300,
  },
  cover: {
    width: "100%",
    height: 200,
  },
  content: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 14,
    textAlign: "center",
    color: "grey",
  },
});

export default MovieCard;
