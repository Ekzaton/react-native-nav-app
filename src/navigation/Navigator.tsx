import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';
import { StackParamsList } from '../types/navigation';

const Stack = createStackNavigator<StackParamsList>();

export default function Navigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={MainPage} options={MainPage.navigationOptions} />
          <Stack.Screen name='Post' component={PostPage} options={PostPage.navigationOptions} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
