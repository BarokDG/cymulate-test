import ActivePhishes from "../components/ActivePhishes";
import PhishForm from "../components/PhishForm";

export default function Dashboard() {
  return (
    <main>
      <PhishForm />
      <ActivePhishes />
    </main>
  );
}
