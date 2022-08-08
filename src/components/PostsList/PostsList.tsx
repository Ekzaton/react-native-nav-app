import { FlatList, StyleSheet, View } from 'react-native';

import NoItems from '../NoItems/NoItems';
import PostsItem from '../PostsItem/PostsItem';

import { PostsListProps } from './PostsList.props';

export default function PostsList(props: PostsListProps) {
  const { posts, navigation } = props;

  if (!posts.length) return <NoItems />;

  return (
      <View style={styles.wrapper}>
        <FlatList
            keyExtractor={post => post.id.toString()}
            data={[...posts].reverse()}
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
  }
})
