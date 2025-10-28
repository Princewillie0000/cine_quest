import React, { useState, useEffect, use } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Carousel from "../components/Carousel.js";
import MovieCard from "../components/MovieCard.js";
import TVShowCard from "../components/TVShowCard.js";
import {
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchSearchResults,
} from "../../utils/api.js";
import { useRouter } from "expo-router";
import SearchBar from "../components/searchBar.js";
import { useTheme } from "../../context/ThemeContext.js";

const Home = () => {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        const movies = await fetchPopularMovies();
        setPopularMovies(movies);
        const shows = await fetchPopularTVShows();
        setPopularTVShows(shows);
      } catch (error) {
        console.error("Error loading data:", error);
        throw error;
      }
    };
    loadData();
  }, []);

  const handleQueryChange = async (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const searchResults = await fetchSearchResults(query);
        setSuggestions(searchResults);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        throw error;
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleQuerySubmit = (event) => {
    const query = event.nativeEvent.text.trim();
    if (query.length > 0) {
      router.push(`/searchScreen?query=${encodeURIComponent(query)}`);
    }
  };

  const renderMovieItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push(`/details?movieId=${item.id}`)}
    />
  );

  const renderShowItem = ({ item }) => (
    <TVShowCard
      show={item}
      onPress={() => router.push(`/details?tvShowId=${item.id}`)}
    />
  );
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000000" : "#ffffff" },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        CINEQUEST
      </Text>
      <SearchBar
        query={searchQuery}
        onQueryChange={handleQueryChange}
        onQuerySubmit={handleQuerySubmit}
        suggestions={suggestions}
      />

      <Text
        style={[
          styles.sectionText,
          // { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        Popular Movies
      </Text>
      <Carousel
        data={popularMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={styles.contentContainer}
      />

      <Text
        style={[
          styles.sectionText,
          { color: theme === "dark" ? "#ffffff" : "#000000" },
        ]}
      >
        Popular TV Shows
      </Text>

      <Carousel
        data={popularTVShows}
        renderItem={renderShowItem}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={styles.contentContainer}
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

  // contentContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   paddingHorizontal: 12,
  // },

  sectionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 20,
    marginTop: 30,
  },

  headerText: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 45,
  },
});

export default Home;
