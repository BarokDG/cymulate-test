export interface Phish {
  _id: string;
  recipient: string;
  content: string;
  status: "Successful" | "Pending";
  createdAt: string;
  updatedAt: string;
}

export interface Collection<T> {
  data: T[];
  count: number;
}
