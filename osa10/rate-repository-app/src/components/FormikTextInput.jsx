import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  text: {
    fontStyle: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.body,
    height: 50,
    width: "auto",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.lightBorder,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    padding: 10,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.text}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
