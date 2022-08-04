import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderIcon from '../components/HeaderIcon/HeaderIcon';
import { Theme } from '../constants/theme';
import BookmarksPage from '../pages/BookmarksPage/BookmarksPage';
import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';
import { BookmarksStackParamsList, MainStackParamsList } from '../types/navigation';

const BookmarksStack = createStackNavigator<BookmarksStackParamsList>();
const MainStack = createStackNavigator<MainStackParamsList>();
const MaterialTabs = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Theme.MAIN_COLOR : '#FFF',
  },
  headerTintColor: Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COLOR
}

function MainTab() {
  return (
      <MainStack.Navigator screenOptions={screenOptions}>
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
      <BookmarksStack.Navigator screenOptions={screenOptions}>
        <BookmarksStack.Screen
            name='Bookmarks'
            component={BookmarksPage}
            options={{
              headerTitle: 'Закладки',
              headerLeft: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                    <Item
                        title='Открыть меню'
                        iconName='menu'
                        onPress={() => console.log('Open menu')}
                    />
                  </HeaderButtons>
              )
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


const tabsContent = (
    <>
      <MaterialTabs.Screen
          name='MainTab'
          component={MainTab}
          options={{
            tabBarLabel: 'Лента',
            tabBarIcon: ({ color }) => <Ionicons name='albums' size={25} color={color} />
          }}
      />
      <MaterialTabs.Screen
          name='BookmarksTab'
          component={BookmarksTab}
          options={{
            tabBarLabel: 'Закладки',
            tabBarIcon: ({ color }) => <Ionicons name='star-sharp' size={25} color={color} />
          }}
      />
    </>
);

export default function Navigator() {
  if (Platform.OS === 'android') {
    return (
        <NavigationContainer>
          <MaterialTabs.Navigator
              barStyle={{
                backgroundColor: Theme.MAIN_COLOR
              }}
              shifting
          >
            {tabsContent}
          </MaterialTabs.Navigator>
        </NavigationContainer>
    );
  } else {
    return (
        <NavigationContainer>
          <Tabs.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Theme.MAIN_COLOR
              }}
          >
            {tabsContent}
          </Tabs.Navigator>
        </NavigationContainer>
    );
  }
}
