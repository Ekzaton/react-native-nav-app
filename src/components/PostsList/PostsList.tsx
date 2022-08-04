import { FlatList, StyleSheet, View } from 'react-native';

import PostsItem from '../PostsItem/PostsItem';

import { PostsListProps } from './PostsList.props';

export default function PostsList(props: PostsListProps) {
  const { data, navigation } = props;

  return (
      <View style={styles.wrapper}>
        <FlatList
            keyExtractor={post => post.id.toString()}
            data={data}
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
