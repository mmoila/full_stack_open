import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBarColor,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab />
    </View>
  );
};

export default AppBar;
