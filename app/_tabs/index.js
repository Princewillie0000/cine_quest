import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import Carousel from "../components/Carousel.js";
import { Dimensions } from "react-native";
import MovieCard from "../components/MovieCard.js";
import TVShowCard from "../components/TVShowCard.js";

const sampleMovieData = [
  {
    id: "1",
    title: "Superman",
    poster_path:
      "https://cdn.britannica.com/61/177761-050-F38C22B1/Christopher-Reeve-Superman-Richard-Donner.jpg", // random dog image
    vote_average: "8",
  },
  {
    id: "2",
    title: "Batman",
    poster_path: "https://picsum.photos/id/238/200/300", // another random
    vote_average: "7.5",
  },
  {
    id: "3",
    title: "Wonder Woman",
    poster_path: "https://picsum.photos/id/239/200/300",
    vote_average: "9",
  },
  {
    id: "4",
    title: "Flash",
    poster_path: "https://picsum.photos/id/240/200/300",
    vote_average: "8.2",
  },
  {
    id: "5",
    title: "Aquaman",
    poster_path: "https://picsum.photos/id/241/200/300",
    vote_average: "8.7",
  },
];

// const renderItem = ({ item }) => {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.itemText}>{item.title}</Text>
//     </View>
//   );
// };

const sampleShowsData = [
  {
    id: 1,
    title: "Breaking Bad",
    poster_path:
      "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    rating: 9.5,
    description:
      "A chemistry teacher turned meth producer teams up with a former student to build an empire, facing law enforcement and rival cartels.",
  },
  {
    id: 2,
    title: "Stranger Things",
    poster_path:
      "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    rating: 8.7,
    description:
      "A group of kids in Hawkins, Indiana, uncover supernatural mysteries and government experiments after their friend goes missing.",
  },
  {
    id: 3,
    title: "Game of Thrones",
    poster_path:
      "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    rating: 9.2,
    description:
      "Noble families vie for control of the Iron Throne in a fantasy world filled with dragons, war, and political intrigue.",
  },
  {
    id: 4,
    title: "The Office (US)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
    rating: 8.9,
    description:
      "A mockumentary sitcom that follows the everyday lives of office employees at Dunder Mifflin’s Scranton branch.",
  },
  {
    id: 5,
    title: "The Crown",
    poster_path:
      "https://image.tmdb.org/t/p/w500/ltlKaXvIWMwlT9p8MI8KHhjcR2u.jpg",
    rating: 8.6,
    description:
      "A biographical drama depicting the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century.",
  },
];

const Home = () => {
  const renderMovieItem = ({ item }) => (
    <MovieCard
      movie={item}
      onPress={() => console.log(`Pressed on ${item.title} Card`)}
    />
  );

  const renderShowItem = ({ item }) => (
    <TVShowCard
      show={item}
      onPress={() => console.log(`Pressed on ${item.title} Card`)}
    />
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}> CINEQUEST</Text>
      <Text style={styles.sectionText}>Movies</Text>
      <Carousel
        data={sampleMovieData}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />

      <Text style={styles.sectionText}>TVShows</Text>

      <Carousel
        data={sampleShowsData}
        renderItem={renderShowItem}
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
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 50,
  },

  //   item: {
  //     width: Dimensions.get("window").width * 0.75, // take 75% of screen width
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#e0e0e0",
  //     borderRadius: 8,
  //     padding: 20,
  //     marginHorizontal: 8,
  //     height: 180,
  //   },

  //   itemText: {
  //     fontSize: 20,
  //     fontWeight: "bold",
  //     paddingTop: 20,
  //   },
});

export default Home;
