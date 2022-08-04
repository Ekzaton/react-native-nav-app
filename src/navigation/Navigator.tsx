import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderIcon from '../components/HeaderIcon/HeaderIcon';
import { Theme } from '../constants/theme';
import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';
import { BookmarksStackParamsList, MainStackParamsList } from '../types/navigation';

const MainStack = createStackNavigator<MainStackParamsList>();
const BookmarksStack = createStackNavigator<BookmarksStackParamsList>();
const Tabs = createBottomTabNavigator();

function MainTab() {
  return (
      <MainStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Theme.MAIN_COLOR : '#FFF',
            },
            headerTintColor: Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COLOR
          }}
      >
        <MainStack.Screen
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
        <MainStack.Screen
            name='Post'
            component={PostPage}
            options={({ route }) => ({
              headerTitle: `Пост №${route.params.id} от ${route.params.date}`,
              headerRight: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                    <Item
                        title={route.params.booked ? 'Убрать из закладок' : 'Дообавить в закладки'}
                        iconName={route.params.booked ? 'star-sharp' : 'star-outline'}
                        onPress={() => console.log('Press photo')}
                    />
                  </HeaderButtons>
              )
            })}
        />
      </MainStack.Navigator>
  );
}

function BookmarksTab() {
  return (
      <BookmarksStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Theme.MAIN_COLOR : '#FFF',
            },
            headerTintColor: Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COLOR
          }}
      >
        <BookmarksStack.Screen
            name='Bookmarks'
            component={MainPage}
            options={{
              headerTitle: 'Закладки'
            }}
        />
        <BookmarksStack.Screen
            name='Post'
            component={PostPage}
            options={({ route }) => ({
              headerTitle: `Пост №${route.params.id} от ${route.params.date}`,
              headerRight: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                    <Item
                        title={route.params.booked ? 'Убрать из закладок' : 'Дообавить в закладки'}
                        iconName={route.params.booked ? 'star-sharp' : 'star-outline'}
                        onPress={() => console.log('Press photo')}
                    />
                  </HeaderButtons>
              )
            })}
        />
      </BookmarksStack.Navigator>
  );
}

export default function Navigator() {
  return (
      <NavigationContainer>
        <Tabs.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: Theme.MAIN_COLOR
            }}
        >
          <Tabs.Screen
              name='Лента'
              component={MainTab}
              options={{
                tabBarIcon: ({color}) => <Ionicons name='albums' size={25} color={color} />
              }}
          />
          <Tabs.Screen
              name='Закладки'
              component={BookmarksTab}
              options={{
                tabBarIcon: ({color}) => <Ionicons name='star-sharp' size={25} color={color} />
              }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
  );
}
