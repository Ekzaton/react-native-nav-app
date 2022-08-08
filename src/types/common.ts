export type PostData = {
  img: string;
  text: string;
  date: string,
  booked: boolean;
}

export type Post = { id: number } & PostData;
