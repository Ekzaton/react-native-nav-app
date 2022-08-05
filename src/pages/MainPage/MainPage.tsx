import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PostsList from '../../components/PostsList/PostsList';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadPosts } from '../../store/slices/posts';
import { StackParamsList } from '../../types/navigation';


export default function MainPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  const dispatch = useAppDispatch();
  const postsAll = useAppSelector(state => state.posts.postsAll);

  useEffect(() => {
    dispatch(loadPosts);
  }, [])

  return <PostsList posts={postsAll} navigation={navigation} />;
}
