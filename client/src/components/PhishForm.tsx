import { FormEvent, useState } from "react";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PhishForm() {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => {
      const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

      return fetch(`${import.meta.env.VITE_API_URL}/phish`, {
        method: "POST",
        body: JSON.stringify({
          recipient: email,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phishes"] });
      setEmail("");
    },
    onError: () => {
      alert("Please try again!");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutate(email);
  };

  return (
    <div className="bg-blue-50 border-b-blue-200 border-b-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-96 w-full mx-auto py-10"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-black px-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black/80 hover:bg-black text-white disabled:opacity-40"
          disabled={isPending}
        >
          {isPending ? "Phishing" : "Phish"}
        </button>
      </form>
    </div>
  );
}
