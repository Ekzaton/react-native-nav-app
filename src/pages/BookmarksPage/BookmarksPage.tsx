import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PostsList from '../../components/PostsList/PostsList';
import { DATA } from '../../data';
import { StackParamsList } from '../../types/navigation';

export default function BookmarksPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  return <PostsList data={DATA.filter((post) => post.booked)} navigation={navigation} />;
}
