import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Post from '../../components/Post/Post';
import { DATA } from '../../data';
import { StackParamsList } from '../../types/navigation';

export default function MainPage() {
  const { navigate } = useNavigation<StackNavigationProp<StackParamsList>>();

  return (
      <View style={styles.wrapper}>
        <FlatList
            keyExtractor={post => post.id.toString()}
            data={DATA}
            renderItem={({item}) => (
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
