import { FormEvent, useState } from "react";

export default function PhishForm() {
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await fetch(`${import.meta.env.VITE_API_URL}/phishes/send`, {
      method: "POST",
      body: JSON.stringify({
        email,
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Phish</button>
    </form>
  );
}
