import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: theme.fontSizes.appBarColor,
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    paddingTop: 40,
    paddingLeft: 15,
    paddingBottom: 10,
  },
});

const AppBarTab = () => {
  return (
    <Pressable style={styles.container}>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/sign-in">
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
