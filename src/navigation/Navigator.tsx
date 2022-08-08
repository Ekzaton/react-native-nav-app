import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HeaderIcon from '../components/HeaderIcon/HeaderIcon';
import { Theme } from '../constants/theme';
import AboutPage from '../pages/AboutPage/AboutPage';
import BookmarksPage from '../pages/BookmarksPage/BookmarksPage';
import CreatePage from '../pages/CreatePage/CreatePage';
import MainPage from '../pages/MainPage/MainPage';
import PostPage from '../pages/PostPage/PostPage';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleBooked } from '../store/slices/posts';
import { StackParamsList } from '../types/navigation';

const AboutStack = createStackNavigator();
const BookmarksStack = createStackNavigator<StackParamsList>();
const CreateStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator<StackParamsList>();
const MaterialTabs = createMaterialBottomTabNavigator();
const Tabs = createBottomTabNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Theme.MAIN_COLOR : '#FFF',
  },
  headerTintColor: Platform.OS === 'android' ? '#FFF' : Theme.MAIN_COLOR
}

function MainStackNavigator() {
  const dispatch = useAppDispatch();
  const postsAll = useAppSelector((state) => state.posts.postsAll);

  return (
      <MainStack.Navigator screenOptions={screenOptions}>
        <MainStack.Screen
            name='Main'
            component={MainPage}
            options={({ navigation }) => ({
              headerTitle: 'Мой блог',
              headerLeft: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon} >
                    <Item
                        title='Открыть меню'
                        iconName='menu'
                        onPress={() => navigation.toggleDrawer()}
                    />
                  </HeaderButtons>
              ),
              headerRight: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                    <Item
                        title='Сделать фото'
                        iconName='camera'
                        onPress={() => navigation.navigate('CreateNavigator')}
                    />
                  </HeaderButtons>
              )
            })}
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
                        onPress={() => {
                          const post = postsAll.find((post) => post.id === route.params.id);

                          dispatch(toggleBooked(post!));
                        }}
                    />
                  </HeaderButtons>
              )
            })}
        />
      </MainStack.Navigator>
  );
}

function BookmarksStackNavigator() {
  const dispatch = useAppDispatch();
  const postsAll = useAppSelector((state) => state.posts.postsAll);

  return (
      <BookmarksStack.Navigator screenOptions={screenOptions}>
        <BookmarksStack.Screen
            name='Bookmarks'
            component={BookmarksPage}
            options={({ navigation }) => ({
              headerTitle: 'Мой блог',
              headerLeft: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                    <Item
                        title='Открыть меню'
                        iconName='menu'
                        onPress={() => navigation.toggleDrawer()}
                    />
                  </HeaderButtons>
              )
            })}
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
                        onPress={() => {
                          const post = postsAll.find((post) => post.id === route.params.id);

                          dispatch(toggleBooked(post!));
                        }}
                    />
                  </HeaderButtons>
              )
            })}
        />
      </BookmarksStack.Navigator>
  );
}

const tabs = (
    <>
      <Tabs.Screen
          name='MainTab'
          component={MainStackNavigator}
          options={{
            tabBarLabel: 'Лента',
            tabBarIcon: ({ color }) => <Ionicons name='albums' size={25} color={color} />
          }}
      />
      <Tabs.Screen
          name='BookmarksTab'
          component={BookmarksStackNavigator}
          options={{
            tabBarLabel: 'Закладки',
            tabBarIcon: ({ color }) => <Ionicons name='star-sharp' size={25} color={color} />
          }}
      />
    </>
);

function BlogTabsNavigator() {
  return (
      Platform.OS === 'android' ?
          <MaterialTabs.Navigator
              barStyle={{
                backgroundColor: Theme.MAIN_COLOR
              }}
              shifting
          >
            {tabs}
          </MaterialTabs.Navigator>
          : <Tabs.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Theme.MAIN_COLOR
              }}
          >
            {tabs}
          </Tabs.Navigator>
  );
}

function AboutStackNavigator() {
  return (
      <AboutStack.Navigator screenOptions={screenOptions}>
        <AboutStack.Screen
            name='About'
            component={AboutPage}
            options={({ navigation }) => ({
              headerTitle: 'О приложении',
              headerLeft: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon} >
                    <Item
                        title='Открыть меню'
                        iconName='menu'
                        onPress={() => navigation.toggleDrawer()}
                    />
                  </HeaderButtons>
              ),
            })}
        />
      </AboutStack.Navigator>
  );
}

function CreateStackNavigator() {
  return (
      <CreateStack.Navigator screenOptions={screenOptions}>
        <CreateStack.Screen
            name='Create'
            component={CreatePage}
            options={({ navigation }) => ({
              headerTitle: 'Новый пост',
              headerLeft: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderIcon} >
                    <Item
                        title='Открыть меню'
                        iconName='menu'
                        onPress={() => navigation.toggleDrawer()}
                    />
                  </HeaderButtons>
              ),
            })}
        />
      </CreateStack.Navigator>
  );
}

function DrawerNavigator() {
  return (
      <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerLabelStyle: {
              fontFamily: 'open-sans-bold'
            },
            drawerActiveTintColor: Theme.MAIN_COLOR
          }}
      >
        <Drawer.Screen
            name='TabsNavigator'
            component={BlogTabsNavigator}
            options={{
              title: 'Мой блог',
            }}
        />
        <Drawer.Screen
            name='CreateNavigator'
            component={CreateStackNavigator}
            options={{
              title: 'Новый пост'
            }}
        />
        <Drawer.Screen
            name='AboutNavigator'
            component={AboutStackNavigator}
            options={{
              title: 'О приложении'
            }}
        />
      </Drawer.Navigator>
  );
}

export default function Navigator() {
  return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
  );
}
