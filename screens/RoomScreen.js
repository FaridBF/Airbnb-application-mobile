import { useRoute } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import displayStars from '../utils/displayStars';

import axios from 'axios';
import Swiper from '../components/Swiper';

export default function RoomScreen() {
  const { params } = useRoute();
  const id = params.id;

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);

  // const [photos, setPhotos] = useState([]);
  // const getRoomsPhotos = (initialPhotos) => {
  //   try {
  //     initialPhotos.map((photo) => {
  //       // utiliser une callback fonction pour modifier le tableau photos
  //       // setPhotos([photo.url, ...photos]); ne conservait que le dernier
  //       setPhotos((photos) => [...photos, photo.url]);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const fetchDataById = async (route, navigation) => {
    try {
      // console.log(route);
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${id}`
      );
      console.log('photo:', response.data.photos);
      setData(response.data);

      // getRoomsPhotos(response.data.photos);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchDataById();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
    </View>
  ) : (
    <View>
      <TouchableOpacity>
        <ImageBackground style={styles.imageBackground}>
          <Swiper photos={data.photos} />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{data.price} €</Text>
          </View>
        </ImageBackground>
        <View style={styles.bottomPart}>
          <View style={styles.leftPart}>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            <View style={styles.starsContainer}>
              {displayStars(data.ratingValue)}
              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
          <View style={styles.rightPart}>
            <Image
              style={styles.ownerPicture}
              source={{ uri: data.user.account.photo.url }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomPartText}
        onPress={() => {
          setShowText(!showText);
        }}
      >
        <Text numberOfLines={showText ? null : 3}>{data.description}</Text>
      </TouchableOpacity>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      ></MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15
  },
  imageBackground: {
    height: 250,
    justifyContent: 'flex-end'
  },
  priceContainer: {
    backgroundColor: 'black',
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'absolute'
  },
  price: {
    color: 'white',
    fontSize: 20
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  reviews: {
    color: '#BBBBBB',
    fontWeight: '400',
    marginLeft: 5
  },
  ownerPicture: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
  bottomPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 85,
    alignItems: 'center',
    padding: 25
  },
  bottomPartText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 95,
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600'
  },
  leftPart: {
    width: '80%'
  },
  rightPart: {
    width: '20%',
    alignItems: 'flex-end'
  }
});
