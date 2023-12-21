import {FC} from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SvgCloseIcon from '../assets/SvgCloseIcon';

interface IModalProps {
  route: {
    params: {
      fullUrl: string;
    };
  };
}

const Modal: FC = ({route}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <SvgCloseIcon />
      </Pressable>
      <Image
        source={{
          uri: route.params.fullUrl,
        }}
        style={styles.img}
        borderTopLeftRadius={Platform.OS === 'ios' ? 10 : 0}
        borderTopRightRadius={Platform.OS === 'ios' ? 10 : 0}
      />
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '#000000c0',
    padding: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1000000,
  },
  img: {
    flex: 1,
  },
});
