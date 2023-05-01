import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Alert } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(
    // minBoundary,
    // maxBoundary,
    1,
    100,
    userNumber
  );

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);
  const [currentGuess, setCurrentGues] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't Lie...", "You know that this is a lie", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGues(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  };

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        {/* <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText> */}
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("greater")}>
              <Ionicons name="md-add" size={24} color={"white"} />
            </PrimaryButton>
          </View>

          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler("lower")}>
              <Ionicons name="md-remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.screen}>
        <Title>Opponent's Guess...</Title>

        {content}
        <View style={styles.listContainer}>
          {/* {guessRounds.map((guessRound) => (
            <Text key={guessRound}>{guessRound}</Text>
          ))} */}
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={guessRoundsListLength - itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    </>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
