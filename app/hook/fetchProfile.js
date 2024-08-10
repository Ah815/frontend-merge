import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

const fetchProfile = () => {
  const [user, setUser] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      setIsProfileLoading(true);
      console.log("Fetching user profile...");

      let bToken = await AsyncStorage.getItem("token");

      if (bToken) {
        bToken = JSON.parse(bToken);
        console.log("This is the bearer token:", bToken);

        const response = await axios.get(
          "https://final-fyp-backend.vercel.app/api/users",
          {
            headers: {
              Authorization: `Bearer ${bToken}`,
            },
          }
        );

        console.log("This is the user's data:", response.data);
        await setUser(response.data);
      } else {
        console.log("No token found in AsyncStorage.");
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError(err);
    } finally {
      setIsProfileLoading(false);
      console.log("Finished fetching user profile.");
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchUserProfile();
  }, []);

  const refetch = () => {
    fetchUserProfile();
  };

  return { user, isProfileLoading, error, refetch };
};

export default fetchProfile;
