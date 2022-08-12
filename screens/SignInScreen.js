import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('nono@airbnb-api.com');
  const [password, setPassword] = useState('pass');

  const [isLoading, setIsLoading] = useState(false);
  const [isSignInBtnActive, setIsSignInBtnActive] = useState(true);

  const signIn = async () => {
    setIsSignInBtnActive(false);
    try {
      if (email.length > 0 && password.length > 0) {
        setIsLoading(true);
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/log_in`,
          { email: email, password: password }
        );
        console.log(response.status);
        if (response.status === 200) {
          setIsLoading(false);
          alert('Votre connexion a réussi');
          const userToken = 'secret-token';
          setToken(userToken);
        }
      } else {
        alert("Merci de remplir l'ensemble des champs");
      }
      setIsSignInBtnActive(true);
    } catch (error) {
      setIsLoading(false);
      setIsSignInBtnActive(true);
      if (error.response.status === 401) {
        alert('Identifiant ou mot de passe incorrect');
      } else {
        alert('Une erreur est survenue lors de la connexion');
      }
      console.log(error.message);
    }
  };

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <View>
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.jpg')}
          />
          <Text style={styles.textLogo}>Sign in</Text>
        </View>

        <TextInput
          placeholder='email'
          style={styles.textInput}
          onChangeText={(text) => {
            setEmail(text);
            console.log(email);
          }}
        />
        <TextInput
          placeholder='Password'
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />

        <Button
          title='Sign in'
          disabled={!isSignInBtnActive}
          onPress={async () => {
            signIn();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFBAC0',
    width: '80%',
    height: 35,
    marginBottom: 30
  },
  logo: {
    width: 100,
    height: 100
  },
  containerLogo: {
    alignItems: 'center'
  },
  textLogo: {
    fontSize: 25,
    color: 'grey',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
