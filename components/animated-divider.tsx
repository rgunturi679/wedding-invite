"use client"

import { motion } from "framer-motion"

export function AnimatedDivider() {
  return (
    <div className="flex items-center justify-center my-16">
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-400"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.div
          className="w-3 h-3 bg-amber-400 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400 to-amber-400"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </motion.div>
    </div>
  )
}
