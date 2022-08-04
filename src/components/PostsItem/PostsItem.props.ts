import { Post } from '../../types/common';

export type PostsItemProps = {
  content: Post;
  onOpen: (content: Post) => void;
}
