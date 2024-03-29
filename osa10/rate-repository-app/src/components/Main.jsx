import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import SignInForm from "./SignIn";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: theme.colors.mainBackground,
    maxWidth: 400,
  },
});

const onSubmit = () => console.log("loggin in");

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="sign-in" element={<SignInForm onSubmit={onSubmit} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
