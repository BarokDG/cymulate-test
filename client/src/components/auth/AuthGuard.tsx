import { useNavigate } from "react-router-dom";
import {
  LocalStorageKeys,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../lib/localStorage";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "verifying">("verifying");

  const token = getItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

  useEffect(() => {
    setStatus("verifying");

    if (!token) {
      navigate("/auth/login");
    }

    fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        removeItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);

        return navigate("/auth/login");
      }

      setStatus("idle");
    });
  }, [navigate, token]);

  if (status === "verifying") {
    return (
      <main className="h-screen grid place-items-center ">
        <h1 className="text-2xl">Verifying session...</h1>
      </main>
    );
  }

  return children;
}
