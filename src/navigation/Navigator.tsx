import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderIcon from '../components/HeaderIcon/HeaderIcon';
import { Theme } from '../constants/theme';
import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';
import { StackParamsList } from '../types/navigation';

const Stack = createStackNavigator<StackParamsList>();

export default function Navigator() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Theme.MAIN_COlOR : '#FFF',
              },
              headerTintColor: Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COlOR
            }}
        >
          <Stack.Screen
              name='Main'
              component={MainPage}
              options={{
                headerTitle: 'Мой блог',
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                      <Item
                          title='Открыть меню'
                          iconName='menu'
                          onPress={() => console.log('Open menu')}
                      />
                    </HeaderButtons>
                ),
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                      <Item
                          title='Сделать фото'
                          iconName='camera'
                          onPress={() => console.log('Press photo')}
                      />
                    </HeaderButtons>
                )
              }}
          />
          <Stack.Screen
              name='Post'
              component={PostPage}
              options={({ route }) => ({
                headerTitle: `Пост №${route.params.id} от ${route.params.date}`,
                headerRight: () => (
                      <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                        <Item
                            title={route.params.booked ? 'Убрать из избранного' : 'Дообавить в избранное'}
                            iconName={route.params.booked ? 'star-sharp' : 'star-outline'}
                            onPress={() => console.log('Press photo')}
                        />
                      </HeaderButtons>
                )
              })}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
