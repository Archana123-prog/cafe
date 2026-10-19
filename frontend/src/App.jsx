import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FoodCardStack from "./components/FoodCardStack";
import Logo from "./components/Logo";
import { MENU } from "./data/menu";
import { CAFE } from "./config";

export default function App() {
  const [autoplay, setAutoplay] = useState(false);
  const [installEvent, setInstallEvent] = useState(null);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setInstallEvent(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const install = async () => {
    installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between">
        <Logo />
        {installEvent && (
          <button
            onClick={install}
            className="rounded-full bg-[#2a1608] px-4 py-2 text-sm font-bold text-[#f7c948] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8472b]"
          >
            Install app
          </button>
        )}
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 text-center"
      >
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#2a1608]">
          {CAFE.tagline}
        </h1>
        <p className="mt-2 text-[15px] text-[#2a1608]/75">Swipe a card to see what's cooking today.</p>
      </motion.div>

      <main className="mt-8 flex flex-1 items-start justify-center">
        <FoodCardStack items={MENU} autoplay={autoplay} />
      </main>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setAutoplay((v) => !v)}
          aria-pressed={autoplay}
          className="rounded-full border-2 border-[#2a1608] px-5 py-2 text-sm font-bold text-[#2a1608] transition-colors hover:bg-[#2a1608] hover:text-[#f7c948] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8472b]"
        >
          {autoplay ? "Pause auto-swipe" : "Auto-swipe cards"}
        </button>
      </div>

      <footer className="mt-8 text-center text-sm text-[#2a1608]/70">
        <p>{CAFE.hours}</p>
        <p>{CAFE.location}</p>
      </footer>
    </div>
  );
}
