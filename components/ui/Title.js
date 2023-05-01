import { Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/colors";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    // color: Colors.accent500,
    textAlign: "center",
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderColor: "white",
    // borderColor: Colors.accent500,
    padding: 12,
    maxWidth: "80%",
    width: 300,
  },
});
