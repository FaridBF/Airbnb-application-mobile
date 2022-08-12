import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Imports logos
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

// Imports screens
import RoomScreen from './screens/RoomScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import SettingsScreen from './screens/SettingsScreen';
import AroundMeScreen from './screens/AroundMeScreen';

// Import components
import LogoHeader from './components/LogoHeader';

// Import functions (utils)
import ArrowBack from './utils/ArrowBack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    } else {
      await AsyncStorage.removeItem('userToken');
    }

    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          <>
            <Stack.Screen
              name='SignIn'
              options={{
                headerShown: false
              }}
            >
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name='SignUp'
              options={{
                headerShown: false
              }}
            >
              {(props) => <SignUpScreen {...props} setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name='Tab' options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                style={{ flexDirection: 'column' }}
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: '#737373'
                }}
              >
                <Tab.Screen
                  name='TabHome'
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={'ios-home'} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTitle: () => <LogoHeader />
                      }}
                    >
                      <Stack.Screen name='Home'>
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name='Room'
                        component={RoomScreen}
                        options={{
                          headerLeft: () => <ArrowBack />
                        }}
                      />
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name='TabAroundMe'
                  options={{
                    tabBarLabel: 'Around Me',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name='place' size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name='AroundMe'
                        options={{
                          title: 'Around Me',
                          headerTitle: () => <LogoHeader />
                        }}
                      >
                        {() => <AroundMeScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name='TabSettings'
                  options={{
                    tabBarLabel: 'My Profile',
                    tabBarIcon: ({ color, size }) => (
                      <Octicons name='person' size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name='Settings'
                        options={{
                          title: 'My Profile',
                          headerTitle: () => <LogoHeader />
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
