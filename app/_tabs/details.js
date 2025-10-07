import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  fetchMovieDetails,
  fetchShowDetails,
  fetchMovieTrailer,
  fetchShowTrailer,
  fetchSimilarMovies,
  fetchSimilarShows,
} from "../../utils/api";
import { WebView } from "react-native-webview";
import MovieCard from "../components/MovieCard";
import TVShows from "../components/TVShowCard";
import Carousel from "../components/Carousel";
import TVShowCard from "../components/TVShowCard";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Details = () => {
  const { movieId, tvShowId } = useLocalSearchParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerId, setTrailerId] = useState(null);
  const [similar, setSimilar] = useState([]);

  const { watched, setWatched, toWatch, setToWatch } = useUser();

  const handleMarkAsToWatch = async () => {
    if (details) {
      const newToWatch = [...toWatch, details];
      setToWatch(newToWatch);

      // save to AsyncStorage
      await AsyncStorage.setItem("toWatch", JSON.stringify(newToWatch));
      console.log("added to Marked as to watch");
    }
  };

  const handleMarkAsWatched = async () => {
    if (details) {
      const newWatched = [...watched, details];
      setWatched(newWatched);

      // save to AsyncStorage
      await AsyncStorage.setItem("watched", JSON.stringify(newWatched));

      console.log(`${details.name || details.title} added to watched list`);
    }
  };
  useEffect(() => {
    const loadDetails = async () => {
      try {
        if (movieId) {
          const movieDetails = await fetchMovieDetails(movieId);
          setDetails(movieDetails);

          const movieTrailerId = await fetchMovieTrailer(movieId);
          setTrailerId(movieTrailerId);

          const similarMovies = await fetchSimilarMovies(movieId);
          setSimilar(similarMovies);
        } else if (tvShowId) {
          const tvShowDetails = await fetchShowDetails(tvShowId);

          setDetails(tvShowDetails);
          const tvShowTrailerId = await fetchShowTrailer(tvShowId);
          setTrailerId(tvShowTrailerId);

          const similarShows = await fetchSimilarShows(tvShowId);
          setSimilar(similarShows);
        }
      } catch (error) {
        console.log("Error fetching movie details", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [movieId, tvShowId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (!details) {
    return <Text style={styles.text}>No Details Available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {trailerId ? (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${trailerId}` }}
            style={styles.video}
            javaScriptEnabled={true}
            domsStorageEnabled={true}
            onError={(error) => {
              console.error("webview error:", error);
              console.log("Full error:", error.response?.data);
            }}
          />
        </View>
      ) : (
        <Text style={styles.noTrailerId}>No trailer available</Text>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{details.title || details.name}</Text>

        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.text}>{details.overview}</Text>

        <Text style={styles.sectionTitle}>Rating</Text>
        <Text style={styles.text}>{details.vote_average}</Text>

        <Text style={styles.sectionTitle}>Release date</Text>
        <Text style={styles.text}>
          {details.release_date || details.first_air_date}
        </Text>

        <Text style={styles.sectionTitle}>Runtime</Text>
        <Text style={styles.text}>
          {details.runtime ? `${details.runtime} minutes` : "N/A"}
        </Text>

        <Text style={styles.sectionTitle}>Genres</Text>
        <Text style={styles.text}>
          {details.genres?.map((genre) => genre.name).join(", ") || "N/A"}
        </Text>

        <Text style={styles.sectionTitle}>Production Companies</Text>
        <Text style={styles.text}>
          {details.production_companies
            ?.map((company) => company.name)
            .join(", ") || "N/A"}
        </Text>

        <Text style={styles.sectionTitle}>Budget</Text>
        <Text style={styles.text}>
          {details.budget ? `$${details.budget.toLocaleString()}` : "N/A"}
        </Text>

        <Text style={styles.sectionTitle}>Revenue</Text>
        <Text style={styles.text}>
          {details.revenue ? `$${details.revenue.toLocaleString()}` : "N/A"}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMarkAsWatched}>
          <Text style={styles.buttonText}>Mark as watched</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleMarkAsToWatch}>
          <Text style={styles.buttonText}> Mark as to watch</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.similarContainer}>
        <Text style={styles.similarTitle}>
          {movieId ? "Similar movies" : "Similar shows"}
        </Text>

        <Carousel
          data={similar}
          renderItem={(item) =>
            movieId ? (
              <MovieCard
                movie={item}
                onPress={() => router.push(`/detail?movieId=${item.id}`)}
              />
            ) : (
              <TVShowCard
                show={item}
                onPress={() => router.push(`/detail?tvShowId=${item.id}`)}
              />
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },

  video: {
    height: 300,
  },

  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },

  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  similarContainer: {
    marginTop: 16,
  },

  similarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Details;
