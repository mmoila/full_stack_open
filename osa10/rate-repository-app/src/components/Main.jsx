import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#e1e4e8",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
