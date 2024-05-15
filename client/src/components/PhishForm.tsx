import { FormEvent, useState } from "react";
import { LocalStorageKeys, getItemFromLocalStorage } from "../lib/localStorage";

export default function PhishForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus("submitting");

    const result = await fetch(`${import.meta.env.VITE_API_URL}/phish`, {
      method: "POST",
      body: JSON.stringify({
        recipient: email,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    if (result.status !== 201) {
      alert("Please try again!");
      return;
    }

    alert("Phish email sent!");
    window.location.reload();
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
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Phishing" : "Phish"}
        </button>
      </form>
    </div>
  );
}
