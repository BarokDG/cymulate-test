import { useLocation, useNavigate } from "react-router-dom";
import {
  LocalStorageKeys,
  removeItemFromLocalStorage,
} from "../lib/localStorage";

interface Props {
  children: React.ReactNode;
}

export default function Dashboard({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  return (
    <main className="flex flex-col min-h-full">
      <div className="flex items-center gap-4 px-10 self-end">
        {!isDashboard && (
          <button
            className="text-sm py-1"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>
        )}
        <button
          className="text-sm py-1"
          onClick={() => {
            removeItemFromLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
            navigate("/auth/login");
          }}
        >
          Log out
        </button>
      </div>
      {children}
    </main>
  );
}
