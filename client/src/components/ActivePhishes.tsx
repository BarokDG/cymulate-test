import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";
import PhishCard from "./PhishCard";

import { Phish as PhishType } from "../lib/types";
import { useQuery } from "@tanstack/react-query";

export default function ActivePhishes() {
  const {
    data: phishes,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useQuery<PhishType[]>({
    queryKey: ["phishes"],
    queryFn: () => {
      const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

      return fetch(`${import.meta.env.VITE_API_URL}/phish`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    },
  });

  if (isPending) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <h1 className="text-lg text-center">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-grow flex flex-col gap-2 justify-center items-center">
        <h1 className="text-lg">Error getting data. Please try again.</h1>
        <button
          className="px-4 py-1 bg-blue-700 text-white"
          onClick={() => {
            refetch();
          }}
        >
          Refetch
        </button>
      </div>
    );
  }

  if (phishes.length === 0) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <h1 className="text-lg text-center">
          Nothing to show. <br /> Create a phish to start tracking.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      {isFetching && <p className="mb-2">Updating...</p>}
      <ol className="grid grid-cols-3 gap-10">
        {phishes?.map((phish) => (
          <li key={phish._id}>
            <PhishCard {...phish} />
          </li>
        ))}
      </ol>
    </div>
  );
}
