export interface Phish {
  _id: string;
  recipient: string;
  content: string;
  status: "Failed" | "Pending";
}
