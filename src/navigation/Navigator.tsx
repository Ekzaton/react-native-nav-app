import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Theme } from '../constants/theme';
import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';
import { StackParamsList } from '../types/navigation';

const Stack = createStackNavigator<StackParamsList>();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Theme.MAIN_COlOR : '#FFF',
  },
  headerTintColor: Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COlOR
}

export default function Navigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
              name='Main'
              component={MainPage}
              options={{
                headerTitle: 'Мой блог'
              }}
          />
          <Stack.Screen
              name='Post'
              component={PostPage}
              options={({ route }) => ({
                headerTitle: `Пост №${route.params.id} от ${route.params.date}`
              })}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
