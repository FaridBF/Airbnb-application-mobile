import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ArrowBack = () => {
  const navigation = useNavigation();
  return (
    <AntDesign
      name='arrowleft'
      size={22}
      color='#737373'
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default ArrowBack;
