import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PostsList from '../../components/PostsList/PostsList';
import { useAppSelector } from '../../store';
import { StackParamsList } from '../../types/navigation';


export default function BookmarksPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  const postsBooked = useAppSelector(state => state.posts.postsBooked);

  return <PostsList posts={postsBooked} navigation={navigation} />;
}
