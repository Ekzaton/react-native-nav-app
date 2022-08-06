import { FlatList, StyleSheet, Text, View } from 'react-native';

import PostsItem from '../PostsItem/PostsItem';

import { PostsListProps } from './PostsList.props';

export default function PostsList(props: PostsListProps) {
  const { posts, navigation } = props;

  if (!posts.length) {
    return (
        <View style={styles.wrapper}>
          <Text style={styles.noItems}>Постов пока нет...</Text>
        </View>
    );
  }

  return (
      <View style={styles.wrapper}>
        <FlatList
            keyExtractor={post => post.id.toString()}
            data={posts}
            renderItem={({ item }) => (
                <PostsItem
                    content={item}
                    onOpen={() => navigation.navigate('Post', {
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
  },
  noItems: {
    marginVertical: 10,
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    textAlign: 'center'
  }
})
