import { Post } from '../../types/common';

export type PostProps = {
  content: Post;
  onOpen: (content: Post) => void;
}
