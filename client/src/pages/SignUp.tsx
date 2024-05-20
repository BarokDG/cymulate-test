import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function SignUp() {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<void> =>
      fetch(`${import.meta.env.VITE_API_URL}/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 201) {
          throw new Error();
        }

        return;
      }),
    onSuccess: () => {
      navigate("/auth/login");
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    mutate({
      email,
      password,
    });
  };

  return (
    <main className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-96 flex flex-col gap-4"
      >
        {isError && (
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
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Sign up"}
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
