import React, {
  useState,
  useEffect,
  createContext,
  userContext,
  Children,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "expo-router/build/global-state/router-store";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState([]);
  const [watched, setWatched] = useState(null);
  const [toWatch, setToWatch] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const watchedData = await AsyncStorage.getItem("watched");
      const toWatchData = await AsyncStorage.getItem("toWatch");
      const storedUsername = await AsyncStorage.getItem("username");

      if (watchedData) setToWatch(JSON.parse(watchedData));
      if (toWatchData) setToWatch(JSON.parse(toWatchData));
      if (storedUsername) setUsername(JSON.parse(storedUsername));
    };
    loadData();
  }, []);

  const updateUsername = async (newUsername) => {
    setUsername(newUsername);
    await AsyncStorage.setItem("username", JSON.stringify(newUsername));
  };
  return (
    <UserContext.Provider
      value={
        (username, updateUsername, watched, toWatch, setToWatch, setWatched)
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
