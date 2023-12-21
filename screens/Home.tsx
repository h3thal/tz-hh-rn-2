import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios, {AxiosResponse} from 'axios';
import Img from '../components/Img/Img';

interface Image {
  urls: {
    small: string;
    full: string;
  };
}

interface RootState {
  stateApp: {
    images: Image[];
    per_page: number;
  };
}

const Home: React.FC = (): React.ReactNode => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stateApp = useSelector((state: RootState) => state.stateApp);
  const [isRefreshing, setRefreshing] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const response: AxiosResponse<Image[]> = await axios.get(
        'https://api.unsplash.com/photos',
        {
          params: {
            client_id: 'AS7zPreMj8LeKBnyECGzU6aXNJ7C54Ji4bHA6TwStaM',
            per_page: stateApp.per_page,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }, [stateApp.per_page]);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const images = await fetchImages();
      dispatch({type: 'resetApi', payload: {images: images}}); // Используйте действие для сброса данных
    } catch (error) {
      // Handle error, if needed
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchImages]);

  const renderItem = useCallback(
    ({item}: {item: Image}) => (
      <Img url={item.urls.small} fullUrl={item.urls.full} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        data={stateApp.images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => {
          // console.log('End reached, load more data!');
          dispatch({type: 'nextPage'});
        }}
        onEndReachedThreshold={0.25}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchData()}
            colors={['#3498db']} // Цвета анимации обновления (если нужно)
          />
        }
        contentContainerStyle={styles.list}
        numColumns={2}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
