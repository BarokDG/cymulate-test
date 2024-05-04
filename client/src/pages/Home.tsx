import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Link to="/auth/login">Log in</Link>
      <Link to="/auth/login">Sign up</Link>
    </main>
  );
}
