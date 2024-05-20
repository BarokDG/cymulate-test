import { useNavigate } from "react-router-dom";
import ActivePhishes from "../components/ActivePhishes";
import PhishForm from "../components/PhishForm";
import {
  LocalStorageKeys,
  removeItemFromLocalStorage,
} from "../lib/localStorage";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col min-h-full">
      <button
        className="self-end text-sm mx-10 py-1 px-2"
        onClick={() => {
          removeItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
          navigate("/auth/login");
        }}
      >
        Log out
      </button>
      <PhishForm />
      <ActivePhishes />
    </main>
  );
}
