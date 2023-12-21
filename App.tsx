import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './screens/Home';
import Modal from './screens/Modal';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={Home} name={'Home'} />
        <Stack.Screen
          component={Modal}
          name={'Modal'}
          options={{
            presentation: Platform.OS === 'ios' ? 'modal' : 'transparentModal',
            animation: 'fade_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
