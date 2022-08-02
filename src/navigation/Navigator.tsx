import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={MainPage} />
          <Stack.Screen name='Post' component={PostPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
