import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Playlist from "./pages/Playlist";
import ContactUs from "./pages/ContactUs";

export default function Home() {
  return (
    <main className="bg-[#222831]">
      <Navbar />
      <HomePage />
      <Playlist />
      <ContactUs />
    </main>
  );
}
