import { View, Image } from 'react-native';

const LogoHeader = () => {
  return (
    <View
      style={{
        height: 50,
        width: 50,
        justifyContent: 'center'
      }}
    >
      <Image
        style={{
          height: 50,
          width: 50
        }}
        source={require('../assets/images/logo.jpg')}
      />
    </View>
  );
};

export default LogoHeader;
