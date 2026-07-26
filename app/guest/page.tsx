"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crown, Heart, Sparkles } from "lucide-react"
import { FloatingParticles } from "@/components/floating-particles"

export default function GuestNamePage() {
  const [guestName, setGuestName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim()) return

    setIsSubmitting(true)
    // Format name for URL (replace spaces with hyphens, lowercase)
    const urlName = guestName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    // Redirect to personalized page
    router.push(`/${urlName}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50 relative overflow-hidden flex items-center justify-center px-4">
      <FloatingParticles />

      {/* Background gradient overlay */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          animate={{
            background: [
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
              "linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)",
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f59e0b 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-center">
          {/* Crown Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Crown size={60} className="text-amber-400 drop-shadow-lg" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-serif text-amber-100 mb-4 tracking-wide"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Lavanya & Vikas Sai
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-400" />
            <motion.div
              className="mx-4"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Sparkles size={24} className="text-amber-400" />
            </motion.div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-amber-400 to-amber-400" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-2xl md:text-3xl text-slate-200 font-light tracking-wide mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Wedding Invitation
          </motion.p>

          <motion.p
            className="text-lg text-slate-300 font-light mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            Enter your name to view your personalized invitation
          </motion.p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-lg bg-white/90 backdrop-blur-sm border-2 border-amber-400/50 focus:border-amber-400 text-slate-900 placeholder-slate-500 transition-all"
                autoFocus
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                type="submit"
                disabled={!guestName.trim() || isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 text-lg font-semibold rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Heart size={20} className="mr-2" />
                    View My Invitation
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Decorative Elements */}
          <motion.div
            className="mt-16 flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Heart size={24} className="text-amber-400/40 animate-pulse" />
            <Sparkles size={24} className="text-amber-400/40 animate-pulse" />
            <Heart size={24} className="text-amber-400/40 animate-pulse" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
