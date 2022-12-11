import { Pressable, View, Text, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    flex: 1,
    paddingTop: 15,
    backgroundColor: "white",
    maxHeight: 220,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
    fontStyle: theme.fonts.main,
    fontColor: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.body,
  },
});

const pressButton = ({ pressed }) => {
  return [
    {
      ...styles.loginButton,
      backgroundColor: pressed
        ? theme.colors.mainBackground
        : theme.colors.primary,
    },
    styles.buttonText,
  ];
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = () => {
  return (
    <View style={styles.loginContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("loggin in")}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => {
          return (
            <>
              <FormikTextInput name="username" placeholder="Username" />
              <FormikTextInput
                secure={true}
                name="password"
                placeholder="Password"
              />
              <Pressable onPress={handleSubmit} style={pressButton}>
                <Text style={styles.buttonText}>Sign in</Text>
              </Pressable>
            </>
          );
        }}
      </Formik>
    </View>
  );
};
export default SignInForm;
