import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Theme } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../store';
import { removePost } from '../../store/slices/posts';
import { StackParamsList } from '../../types/navigation';

export default function PostPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();
  const { params } = useRoute<RouteProp<StackParamsList, 'Post'>>();
  const { id } = params;

  const dispatch = useAppDispatch()

  const postsAll = useAppSelector((state) => state.posts.postsAll);
  const post = postsAll.find((post) => post.id === id);

  const removeHandler = () => {
    Alert.alert(
        'Удаление поста',
        'Вы уверены что хотите удалить пост?',
        [
          {
            text: 'Отменить',
            style: 'cancel'
          },
          {
            text: 'Удалить',
            onPress: () => {
              navigation.push('Main');
              navigation.push('Bookmarks');
              dispatch(removePost(id));
            },
            style: 'destructive'
          }
        ]
    );
  }

  if (!post) return null;

  return (
      <ScrollView style={styles.wrap}>
        <Image style={styles.image} source={{ uri: post!.img }} />
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{post!.text}</Text>
        </View>
        <Button title='Удалить' color={Theme.DANGER_COLOR} onPress={removeHandler} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 10
  },
  image: {
    width: '100%',
    height: 200
  },
  titleWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-regular'
  }
})
