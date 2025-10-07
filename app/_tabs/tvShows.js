import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Carousel from "../components/Carousel.js";
import MovieCard from "../components/MovieCard.js";
import { fetchPopularMovies, fetchRecommendMovies } from "../../utils/api.js";
import { useRouter } from "expo-router";

const Movies = () => {
  const router = useRouter();
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
      onPress={() => router.push(`/details?tvShowId=${item.id.toString()}`)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionText}>Recommended Movies</Text>
      <Carousel
        data={recommendedMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />

      <Text style={styles.sectionText}>Popular Movies</Text>

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
    fontSize: 20,
    fontWeight: 600,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 20,
  },
});

export default Movies;
