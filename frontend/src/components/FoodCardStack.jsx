import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

/**
 * Swipeable card stack (Swiper EffectCards + Framer Motion).
 * Props: items, autoplay (bool), autoplayDelay (ms), loop (bool)
 */
export default function FoodCardStack({ items, autoplay = false, autoplayDelay = 2500, loop = true }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="flex w-full flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full"
      >
        <Swiper
          key={autoplay ? "auto" : "manual"}
          effect="cards"
          grabCursor
          loop={loop}
          modules={[EffectCards, Autoplay]}
          autoplay={autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
          onSlideChange={(s) => setActive(s.realIndex)}
          className="!h-[400px] !w-[270px]"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="!rounded-[28px] shadow-xl">
              <div
                className="relative flex h-full w-full flex-col items-center justify-between p-5 text-white"
                style={{ background: `linear-gradient(160deg, ${item.from}, ${item.to})` }}
              >
                <div className="flex w-full items-center justify-between text-sm font-semibold">
                  <span className="rounded-full bg-black/25 px-3 py-1">₹{item.price}</span>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-white bg-white"
                    aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
                  >
                    <span className={`h-3 w-3 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                  </span>
                </div>

                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-44 w-44 rounded-full object-cover" draggable={false} />
                ) : (
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="select-none text-[120px] leading-none drop-shadow-[0_14px_14px_rgba(0,0,0,0.3)]"
                    aria-hidden="true"
                  >
                    {item.emoji}
                  </motion.div>
                )}

                <h3 className="text-center text-2xl font-extrabold leading-tight">{item.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <div className="mt-10 min-h-[96px] max-w-xs text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <p className="text-lg font-bold text-[#2a1608]">
              {current.name} · ₹{current.price}
            </p>
            <p className="mt-1 text-[15px] leading-snug text-[#2a1608]/80">{current.desc}</p>
            <p className="mt-1 text-sm text-[#2a1608]/60">{current.kcal} kcal</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
