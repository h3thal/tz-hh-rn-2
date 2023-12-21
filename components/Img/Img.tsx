import {FC, useCallback} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface IImgProps {
  url: string;
  fullUrl: string;
}

const Img: FC<IImgProps> = ({url, fullUrl}) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate('Modal', {fullUrl: fullUrl});
  }, [fullUrl]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{uri: url}} style={styles.image} />
    </Pressable>
  );
};

export default Img;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
});
