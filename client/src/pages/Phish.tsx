import { useParams } from "react-router-dom";
import PhishCard from "../components/PhishCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";
import { Phish as PhishType } from "../lib/types";

export default function Phish() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: phish,
    isPending,
    isError,
    refetch,
  } = useQuery<PhishType>({
    queryKey: ["phishes", id],
    queryFn: () => {
      const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

      return fetch(`${import.meta.env.VITE_API_URL}/phish/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json());
    },
    initialData: () => {
      const phishesData: PhishType[] | undefined = queryClient.getQueryData([
        "phishes",
      ]);

      if (!phishesData) {
        return undefined;
      }

      return phishesData.find((phish) => phish._id === id);
    },
    staleTime: 1000,
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
        <h1>Error fetching phish data. Please try again.</h1>
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

  return (
    <div className="px-10">
      <PhishCard {...phish} />
    </div>
  );
}
