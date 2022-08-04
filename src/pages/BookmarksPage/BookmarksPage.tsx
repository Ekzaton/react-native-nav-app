import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Post from '../../components/Post/Post';
import { DATA } from '../../data';
import { BookmarksStackParamsList } from '../../types/navigation';

export default function BookmarksPage() {
  const { navigate } = useNavigation<StackNavigationProp<BookmarksStackParamsList>>();

  return (
      <View style={styles.wrapper}>
        <FlatList
            keyExtractor={(post) => post.id.toString()}
            data={DATA.filter((post) => post.booked)}
            renderItem={({ item }) => (
                <Post
                    content={item}
                    onOpen={() => navigate('Post', {
                      id: item.id,
                      date: new Date(item.date).toLocaleDateString(),
                      booked: item.booked
                    })}
                />
            )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
})
