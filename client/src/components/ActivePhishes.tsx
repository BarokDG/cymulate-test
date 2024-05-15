import { useEffect, useState } from "react";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";

interface Collection<T> {
  count: number;
  data: T[];
}

interface Phish {
  _id: string;
  recipient: string;
  content: string;
  status: "Failed" | "Pending";
}

export default function ActivePhishes() {
  const [phishes, setPhishes] = useState<Collection<Phish>>();

  useEffect(() => {
    const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

    fetch(`${import.meta.env.VITE_API_URL}/phish`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPhishes(data);
      });
  }, []);

  if (!phishes?.data || phishes.count === 0) {
    return <h1>Nothing to show</h1>;
  }

  return (
    <ol>
      {phishes?.data.map(({ _id, content, recipient, status }) => (
        <li key={_id}>
          <div>id: {_id}</div>
          <div>content: {content}</div>
          <div>to: {recipient}</div>
          <div>status: {status}</div>
        </li>
      ))}
    </ol>
  );
}
