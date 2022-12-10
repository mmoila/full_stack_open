import { TextInput as NativeTextInput } from "react-native";

const TextInput = ({ style, error, secure, ...props }) => {
  const textInputStyle = [style];

  return (
    <NativeTextInput
      secureTextEntry={secure}
      style={textInputStyle}
      {...props}
    />
  );
};

export default TextInput;
