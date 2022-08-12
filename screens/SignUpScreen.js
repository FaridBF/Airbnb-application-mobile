import {
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import CustomInput from '../components/CustomInput';

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            'https://express-airbnb-api.herokuapp.com/user/sign_up',
            {
              email,
              username,
              description,
              password
            }
          );
          console.log(response.data);
          if (response.data.token) {
            setToken(response.data.token);
            alert('Inscription réussie');
          }
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
          }
        }
      } else {
        setErrorMessage('Vos mots de passe ne sont pas identiques');
      }
    } else {
      setErrorMessage('veuillez remplir tous les champs');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Image source={require('../assets/images/logo.png')} />
      <Text style={styles.title}>Sign Up</Text>
      <CustomInput placeholder={'email'} value={email} setState={setEmail} />
      <CustomInput
        placeholder={'username'}
        value={username}
        setState={setUsername}
      />
      <TextInput
        multiline={true}
        placeholder='Describe yourself in a few words...'
        style={styles.bigInput}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <CustomInput
        placeholder={'password'}
        value={password}
        setState={setPassword}
        password
      />
      <CustomInput
        placeholder={'confirm password'}
        value={confirmPassword}
        setState={setConfirmPassword}
        password
      />
      {errorMessage ? (
        <Text style={{ color: 'red' }}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.signUp} onPress={handleSubmit}>
        <Text>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goToSignIn}
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        <Text>Already have an account ? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#727272',
    marginBottom: 50
  },
  bigInput: {
    borderWidth: 2,
    borderColor: '#FFBAC0',
    width: '80%',
    height: 80,
    marginBottom: 30
  },
  signUp: {
    borderWidth: 2,
    borderColor: '#F9585D',
    marginTop: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 25
  },
  goToSignIn: {
    marginVertical: 30
  }
});
