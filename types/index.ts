export type User = {
  uid: string;
  name: string;
  email: string;
  avatarUrl: string;
};

export type Message = {
  id: number;
  sender: string;
  avatarUrl: string;
  content: string;
  time: string;
};
