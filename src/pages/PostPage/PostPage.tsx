import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { Theme } from '../../constants/theme';
import { DATA } from '../../data';
import { MainStackParamsList } from '../../types/navigation';

export default function PostPage() {
  const { params } = useRoute<RouteProp<MainStackParamsList, 'Post'>>();

  const post = DATA.find((post) => post.id === params.id);

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
            onPress: () => {},
            style: 'destructive'
          }
        ]
    );
  }

  return (
      <ScrollView>
        <Image style={styles.image} source={{ uri: post!.img }} />
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{post!.text}</Text>
        </View>
        <Button title='Удалить' color={Theme.DANGER_COLOR} onPress={removeHandler} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
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
