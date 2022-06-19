// File to create types

// this stuff comes back from santiy which we don't want the user to have
export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: boolean;
}

export type TweetBody = {
  text: string;
  username: string;
  profileImg: string;
  image?: string;
};
