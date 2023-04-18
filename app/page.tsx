import Image from "next/image";
import Sidebar from "./ components/Sidebar";
import Welcome from "./ components/Welcome";
export default function Home() {
  return (
    <main className="min-h-screen bg-body text-white w-full">
      <div className="flex container mx-auto">
        <Welcome />
      </div>
    </main>
  );
}
