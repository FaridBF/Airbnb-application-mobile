import { Entypo } from '@expo/vector-icons';

const displayStars = (num) => {
  const tab = [];
  for (let i = 0; i < 5; i++) {
    if (i < num) {
      tab.push(<Entypo key={i} name='star' size={20} color='#FFB100' />);
    } else {
      tab.push(<Entypo key={i} name='star' size={20} color='#BBBBBB' />);
    }
  }
  return tab;
};

export default displayStars;
