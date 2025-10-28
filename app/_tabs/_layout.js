import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme as usePaperTheme } from "react-native-paper";
import { useTheme } from "../../context/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();
  const paperTheme = usePaperTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        topBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "movies") {
            iconName = "movie";
          } else if (route.name === "tvShows") {
            iconName = "television";
          } else if (route.name === "users") {
            iconName = "account";
          } else if (route.details) {
            iconName = "details";
          } else if (route.name === "searchScreen") {
            iconName = "magnify";
          }

          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },

        tabBarActiveTintColor:
          theme === "dark"
            ? paperTheme.colors.primary
            : paperTheme.colors.accent,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: paperTheme.colors.background },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="movies" options={{ title: "Movies" }} />
      <Tabs.Screen name="tvShows" options={{ title: "TV Shows" }} />
      <Tabs.Screen name="users" options={{ title: "Profile" }} />
      <Tabs.Screen
        name="details"
        options={{ title: "Details", tabBarButton: () => null }}
      />
      <Tabs.Screen
        name="searchScreen"
        options={{ title: "Search", tabBarButton: () => null }}
      />
    </Tabs>
  );
};

export default Layout;
