import { useEffect, useState } from "react";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";
import Phish from "./Phish";

import { Phish as PhishType } from "../lib/types";

export default function ActivePhishes() {
  const [phishes, setPhishes] = useState<PhishType[] | null>(null);

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

  if (!phishes || phishes.length === 0) {
    return <h1>Nothing to show</h1>;
  }

  return (
    <ol className="grid grid-cols-3 gap-10 p-10">
      {phishes?.map((phish) => (
        <li key={phish._id}>
          <Phish {...phish} />
        </li>
      ))}
    </ol>
  );
}
