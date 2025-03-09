import { StatusBar } from "expo-status-bar";
import { Animated, Dimensions, PanResponder, View } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import { useUserStore } from "@/store/userStore";
import { GetAllUser } from "@/service/userService";
import { DislikeUser, LikeUser } from "@/service/swipeService";

const { width, height } = Dimensions.get("screen");

export default function SwipeScreen() {
  // Récupération des données utilisateur depuis le store global
  const { user }: any = useUserStore();

  const [users, setUsers] = useState([]);
  // Animated value for swipe and title
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchUsers = async () => {
      // const response = await GetAllUser();
      //setUsers(response.data);
    };
    try {
      fetchUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const handleLike = async (userId: string) => {
    const response = await LikeUser(userId);
    console.log(response);
  };

  const handleDislike = async (userId: string) => {
    const response = await DislikeUser(userId);
    console.log(response);
  };

  //Pan responder config
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
    },
    onPanResponderRelease: async (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        // Récupérer l'ID de l'utilisateur de la première carte
        const swipedUserId = users[0].id;
        try {
          if (direction > 0) {
            await handleLike(swipedUserId);
          } else {
            await handleDislike(swipedUserId);
          }
        } catch (error) {
          console.error("Error sending swipe request:", error);
        }

        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 1000,
          toValue: { x: direction * 500, y: dy },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  // Remove the top card from the users array
  const removeTopCard = useCallback(() => {
    setUsers((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  // Handler user choice (left or right)
  const handleChoice = useCallback(
    async (direction: number) => {
      // Récupérer l'ID de l'utilisateur de la première carte
      const swipedUserId = users[0].id;
      try {
        if (direction > 0) {
          await handleLike(swipedUserId);
        } else {
          await handleDislike(swipedUserId);
        }
      } catch (error) {
        console.error("Error sending swipe request:", error);
      }

      Animated.timing(swipe.x, {
        toValue: direction * 500,
        duration: 2000,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x, users]
  );

  // Handler user choice (left or right)
  useEffect(() => {
    if (!users.length) {
      setUsers(users);
    }
  }, [users.length]);

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <StatusBar hidden={true} />
      {users
        .map(
          (
            { id, firstname, lastname, image, location, distance, age },
            index
          ) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <Card
                key={id}
                id={id}
                firstname={firstname}
                lastname={lastname}
                location={location}
                distance={distance}
                age={age}
                image={image}
                isFirst={isFirst}
                swipe={swipe}
                titleSign={titlSign}
                {...dragHandlers}
              />
            );
          }
        )
        .reverse()}
      <Footer handleChoice={handleChoice} />
    </View>
  );
}
