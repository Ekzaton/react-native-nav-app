import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PostsList from '../../components/PostsList/PostsList';
import { DATA } from '../../data';
import { BookmarksStackParamsList } from '../../types/navigation';

export default function BookmarksPage() {
  const navigation = useNavigation<StackNavigationProp<BookmarksStackParamsList>>();

  return <PostsList data={DATA.filter((post) => post.booked)} navigation={navigation} />;
}
