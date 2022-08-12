import { TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, value, setState, password }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={(text) => {
        setState(text);
      }}
      secureTextEntry={password ? true : false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFBAC0',
    width: '80%',
    height: 35,
    marginBottom: 30
  }
});

export default CustomInput;
