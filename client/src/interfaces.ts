export interface IUser {
  _id: string;
  username: string;
  email: string;
  token: string;
}

export interface IErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IPost {
  _id: string;
  body: string;
  author: IUser;
  likes: IUser[];
  comments: IComment[];
  createdAt: string;
}

export interface IComment {
  _id: string;
  body: string;
  author: IUser;
  createdAt: string;
}

