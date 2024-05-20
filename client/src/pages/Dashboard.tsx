import ActivePhishes from "../components/ActivePhishes";
import PhishForm from "../components/PhishForm";

export default function Dashboard() {
  return (
    <main className="flex flex-col min-h-full">
      <PhishForm />
      <ActivePhishes />
    </main>
  );
}
