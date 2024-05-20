import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "rc-pagination";

import PhishCard from "./PhishCard";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";
import { Collection, Phish as PhishType } from "../lib/types";

export default function ActivePhishes() {
  const [page, setPage] = useState(1);

  const {
    data: phishes,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useQuery<Collection<PhishType>>({
    queryKey: ["phishes", page],
    queryFn: () => {
      const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

      return fetch(
        `${import.meta.env.VITE_API_URL}/phish?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => response.json());
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

  if (phishes.count === 0) {
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
        {phishes?.data.map((phish) => (
          <li key={phish._id}>
            <PhishCard {...phish} clickable />
          </li>
        ))}
      </ol>

      <Pagination
        current={page}
        pageSize={5}
        total={phishes.count}
        onChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
