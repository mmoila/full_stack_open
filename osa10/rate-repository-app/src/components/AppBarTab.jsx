import { Pressable, Text, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: theme.fontSizes.appBarColor,
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = () => {
  return (
    <Pressable>
      <Text style={styles.text}>Repositories</Text>
    </Pressable>
  );
};

export default AppBarTab;
