import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Carousel from "../components/Carousel.js";
import MovieCard from "../components/MovieCard.js";
import { fetchPopularMovies, fetchRecommendMovies } from "../../utils/api.js";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext.js";

const Movies = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const [popularMovies, setPopularMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const popMovies = await fetchPopularMovies();
        setPopularMovies(popMovies);
        const recMovies = await fetchRecommendMovies();
        setRecommendedMovies(recMovies);
      } catch (error) {
        console.error("Error loading data:", error);
        throw error;
      }
    };
    loadData();
  }, []);

  const renderMovieItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push(`/details?movieId=${item.id}`)}
    />
  );

  return (
    <ScrollView
      style={
        ([styles.container],
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" })
      }
    >
      <Text
        style={[
          styles.headerText,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        Recommended Movies
      </Text>
      <Carousel
        data={recommendedMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />

      <Text
        style={[
          styles.sectionText,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        Popular Movies
      </Text>

      <Carousel
        data={popularMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  sectionText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    marginTop: 20,
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 50,
  },
});

export default Movies;
