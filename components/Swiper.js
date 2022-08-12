import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

// const photos = ['tomato', 'thistle', 'skyblue', 'teal'];

const Swiper = ({ photos }) => (
  // const colors = [photos];

  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={photos}
      renderItem={({ item }) => (
        <View style={styles.child}>
          <Image style={styles.roomPictures} source={{ uri: item.url }} />
        </View>
      )}
    />
  </View>
);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
  roomPictures: {
    height: 300
  }
});

export default Swiper;
