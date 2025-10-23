export type UserNameObject = {
  title?: string;
  first: string;
  last: string;
};

export type User = {
  id: string;
  name: string | UserNameObject; 
  email: string;
};