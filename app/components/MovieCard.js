import React from "react";
import { Card, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.shadowContainer}>
        <Card style={styles.card}>
          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.cover}
          />
          <Card.Content style={styles.content}>
            <Text variant="titleMedium" style={styles.title}>
              {movie.title || movie.name}
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              Rating: {movie.vote_average}
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
    flex: 1,
    borderRadius: 8,
    width: 150,
    height: 300,
  },
  cover: {
    width: "100%",
    height: 200,
  },
  content: {
    paddingVertical: 1,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "800",
  },
  paragraph: {
    fontSize: 15,
    textAlign: "center",
    color: "grey",
  },
});

export default MovieCard;
