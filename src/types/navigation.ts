type PostParams = {
  id: string;
  date: string;
  booked: boolean;
}

export type MainStackParamsList = {
  Main: undefined;
  Post: PostParams;
};

export type BookmarksStackParamsList = {
  Bookmarks: undefined;
  Post: PostParams;
};
