import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MovieCard from "../components/MovieCard";
import Carousel from "../components/Carousel";
import TVShowCard from "../components/TVShowCard";
import {
  fetchSearchResults,
  fetchSimilarMovies,
  fetchSimilarShows,
} from "../../utils/api";
import { useLocalSearchParams, useRouter } from "expo-router";

const searchScreen = () => {
  const { query } = useLocalSearchParams();
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [itemType, setItemType] = useState(null); // "movie" or "tv"

  useEffect(() => {
    const searchMoviesOrShows = async (query) => {
      try {
        const results = await fetchSearchResults(query);
        setSearchResults(results);

        if (results.length > 0) {
          const firstItem = firstItem[0];
          const isMovie = !!firstItem.title;

          setItemType(isMovie ? "movie" : "tv");

          if (isMovie) {
            const similarMovies = await fetchSimilarMovies(firstItem.id);
            setSimilar(similarMovies);
          } else {
            const similarShows = await fetchSimilarShows(firstItem.id);
            setSimilar(similarShows);
          }
        }
      } catch (error) {
        console.error("Error fetching search results :", error);
        throw error;
      }
    };
    searchMoviesOrShows();
  }, [query]);

  const renderSearchResultItem = ({ item }) => {
    const isMovie = !!item.title;

    return isMovie ? (
      <MovieCard
        movie={item}
        onPress={() => router.push(`/details?movieId=${item.id}`)}
      />
    ) : (
      <TVShowCard
        movie={item}
        onPress={() => router.push(`/details?tvShowId=${item.id}`)}
      />
    );
  };

  const renderSimilarItems = ({ item }) => {
    return itemType == "movie" ? (
      <MovieCard
        movie={item}
        onPress={() => router.push(`/details?movieId=${item.id}`)}
      />
    ) : (
      <TVShowCard
        movie={item}
        onPress={() => router.push(`/details?tvShowId=${item.id}`)}
      />
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}> Search results for {query}</Text>
      <Carousel data={searchResults} renderItem={renderSearchResultItem} />

      {similar.length > 0 && (
        <>
          <Text style={styles.sectionText}>
            similar {itemType === "movie" ? "movie" : "shows"}
          </Text>
          <Carousel data={similar} renderItem={renderSimilarItems} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },

  sectionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
});

export default searchScreen;
