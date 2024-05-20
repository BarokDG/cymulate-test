import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import PhishCard from "./PhishCard";
import StyledPagination from "./StyledPagination";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";
import { Collection, Phish as PhishType } from "../lib/types";

const RESULTS_PER_PAGE_OPTIONS = [5, 10, 25];

export default function ActivePhishes() {
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const {
    data: phishes,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useQuery<Collection<PhishType>>({
    queryKey: ["phishes", page, resultsPerPage],
    queryFn: () => {
      const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

      return fetch(
        `${
          import.meta.env.VITE_API_URL
        }/phish?page=${page}&limit=${resultsPerPage}`,
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
    <div className="p-10 flex flex-col gap-5">
      {isFetching && <p className="mb-2">Updating...</p>}

      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="resultsPerPage">Results per page</label>
          <select
            className="border border-black/80 ml-2"
            id="resultsPerPage"
            value={resultsPerPage}
            onChange={(e) => {
              const { value } = e.target;

              setResultsPerPage(+value);
            }}
          >
            {RESULTS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <button
          className="self-end bg-gray-300 px-2 py-1 text-sm"
          onClick={() => {
            refetch();
          }}
        >
          Refresh
        </button>
      </div>

      <ol className="grid grid-cols-3 gap-10">
        {phishes?.data.map((phish) => (
          <li key={phish._id}>
            <PhishCard {...phish} clickable />
          </li>
        ))}
      </ol>

      <StyledPagination
        current={page}
        pageSize={resultsPerPage}
        total={phishes.count}
        onChange={(newPage) => setPage(newPage)}
        className="self-center"
      />
    </div>
  );
}
