import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"error" | "idle" | "submitting">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus("submitting");

    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-up`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (result.status !== 201) {
        throw new Error();
      }

      navigate("/auth/login");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  return (
    <main className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-96 flex flex-col gap-4"
      >
        {status === "error" && (
          <p className="bg-red-200 text-red-900 px-2 py-1">
            An error occurred, please try again!
          </p>
        )}
        <div className="space-y-2">
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
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-black px-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-black/80 hover:bg-black text-white py-1 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Sign up"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
