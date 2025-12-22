"use client"
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { plexMono } from "./fonts"

export function LettersAnimation({
    start = " ",
  }: {
    start: string,
  }) {

  const randRef = React.useRef<boolean>(true);

  React.useEffect(() => {
  randRef.current = Math.random() < 0.5;
}, [start]);

  
return (
  <>
  <div className="px-0.5 text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-7xl md:leading-16 w-fit flex justify-center mx-auto gap-1.5">
    <AnimatePresence mode="popLayout">
     <motion.p className={plexMono.className}
  key={start}
  initial={{ opacity: 0, y: -120 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 60 }}
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 28,
  }}
>
  {start}
  </motion.p>
  </AnimatePresence>
     
  </div>
 
  </>
) }

