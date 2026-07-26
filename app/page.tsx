"use client"

import { useEffect } from "react"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Calendar, Clock, MapPin, Heart, Gift, Users, Star, Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useRef } from "react"
import { FloatingParticles } from "@/components/floating-particles"
import { AnimatedDivider } from "@/components/animated-divider"
import { CountdownTimer } from "@/components/countdown-timer"
import { useRouter } from "next/navigation"

export default function WeddingInvitation() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const router = useRouter()

  useEffect(() => {
    // Redirect to a default guest name if no specific name is provided
    router.push("/guest")
  }, [router])

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const headerY = useTransform(smoothProgress, [0, 1], [0, -200])
  const headerOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0])
  const headerScale = useTransform(smoothProgress, [0, 0.3], [1, 0.8])

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]))
  }

  const events = [
    {
      id: "haldi",
      title: "Haldi",
      date: "26 August 2026",
      time: "3:00 PM onwards",
      venue: "B R R Convention Hall, Near Kovvur Bus Stand",
      location: "Kovvur, Rajahmundry",
      icon: Gift,
      color: "from-yellow-500 via-amber-500 to-yellow-600",
      shadowColor: "shadow-yellow-500/25",
      description: "Join us for the auspicious Haldi ceremony",
    },
    {
      id: "sangeet",
      title: "Sangeet",
      date: "27 August 2026",
      time: "9:30 AM onwards",
      venue: "B R R Convention Hall, Near Kovvur Bus Stand",
      location: "Kovvur, Rajahmundry",
      icon: Users,
      color: "from-purple-500 via-indigo-500 to-purple-600",
      shadowColor: "shadow-purple-500/25",
      description: "An evening of music, dance, and merriment",
    },
    {
      id: "wedding",
      title: "Wedding",
      date: "27 August 2026",
      time: "7:30 PM onwards",
      venue: "B R R Convention Hall, Near Kovvur Bus Stand",
      location: "Kovvur, Rajahmundry",
      icon: Heart,
      color: "from-rose-500 via-pink-500 to-rose-600",
      shadowColor: "shadow-rose-500/25",
      description: "Join us for the sacred ceremony and celebration",
    },
    {
      id: "reception",
      title: "Reception",
      date: "02 September 2026",
      time: "6:30 PM onwards",
      venue: "VMRDA Children's Arena",
      location: "Near HP Petrol Pump, Siripuram, Visakhapatnam",
      icon: Gift,
      color: "from-emerald-500 via-teal-500 to-emerald-600",
      shadowColor: "shadow-emerald-500/25",
      description: "A grand reception to celebrate our union",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50 relative overflow-hidden"
    >
      <FloatingParticles />

      {/* Enhanced Header Section */}
      <motion.header
        className="relative overflow-hidden min-h-screen flex items-center justify-center"
        style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
      >
        {/* Animated Background */}
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

          {/* Animated Overlay Pattern */}
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

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Crown Icon */}
            <motion.div
              className="mb-8"
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
                <Crown size={60} className="text-amber-400 mx-auto drop-shadow-lg" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-7xl md:text-9xl font-serif text-amber-100 mb-8 tracking-wide"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#fbbf24" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Lavanya
              </motion.span>
              <motion.span
                className="text-amber-300 mx-4 inline-block"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                &
              </motion.span>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05, color: "#fbbf24" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Vikas Sai
              </motion.span>
            </motion.h1>

            {/* Enhanced Divider */}
            <motion.div
              className="flex items-center justify-center mb-10"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              <motion.div
                className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
              <motion.div
                className="mx-6"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Sparkles size={24} className="text-amber-400" />
              </motion.div>
              <motion.div
                className="w-20 h-px bg-gradient-to-l from-transparent via-amber-400 to-amber-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.div>

            <motion.p
              className="text-2xl md:text-3xl text-slate-200 font-light tracking-wide mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Joyfully invite you, our cherished guest
            </motion.p>

            <motion.p
              className="text-xl md:text-2xl text-slate-300 font-light mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              to celebrate with us
            </motion.p>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <CountdownTimer />
            </motion.div>
          </motion.div>

          {/* Enhanced Floating Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-300/20"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              {i % 3 === 0 ? (
                <Heart size={16 + i} />
              ) : i % 3 === 1 ? (
                <Star size={16 + i} />
              ) : (
                <Sparkles size={16 + i} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.header>

      <AnimatedDivider />

      {/* Enhanced Events Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-serif text-slate-800 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Celebration Events
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join us for these special moments as we begin our journey together
          </motion.p>
        </motion.div>

        <div className="space-y-16">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`overflow-hidden border-0 shadow-2xl ${event.shadowColor} bg-white/90 backdrop-blur-sm group`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Enhanced Event Icon & Gradient */}
                    <div
                      className={`lg:w-2/5 bg-gradient-to-br ${event.color} p-12 flex flex-col items-center justify-center relative overflow-hidden`}
                    >
                      {/* Animated Background Elements */}
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />

                      <motion.div
                        className="absolute top-4 right-4 opacity-20"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Sparkles size={40} className="text-white" />
                      </motion.div>

                      <motion.div
                        className="relative z-10 text-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <event.icon size={100} className="text-white drop-shadow-2xl mb-4" />
                        </motion.div>
                        <motion.h3
                          className="text-2xl font-serif text-white/90 tracking-wide"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                          {event.title}
                        </motion.h3>
                      </motion.div>
                    </div>

                    {/* Enhanced Event Details */}
                    <div className="lg:w-3/5 p-12 relative">
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full -mr-10 -mt-10 opacity-50"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />

                      <motion.h3
                        className="text-4xl font-serif text-slate-800 mb-3"
                        whileHover={{ scale: 1.02, color: "#f59e0b" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {event.title}
                      </motion.h3>

                      <motion.p
                        className="text-slate-600 mb-8 text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {event.description}
                      </motion.p>

                      <div className="space-y-4 mb-8">
                        <motion.div
                          className="flex items-center text-slate-700 group/item"
                          whileHover={{ x: 10, scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="mr-4 p-2 bg-slate-100 rounded-full group-hover/item:bg-amber-100 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Calendar className="text-slate-600 group-hover/item:text-amber-600" size={20} />
                          </motion.div>
                          <span className="font-semibold text-lg">{event.date}</span>
                        </motion.div>

                        <motion.div
                          className="flex items-center text-slate-700 group/item"
                          whileHover={{ x: 10, scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="mr-4 p-2 bg-slate-100 rounded-full group-hover/item:bg-amber-100 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Clock className="text-slate-600 group-hover/item:text-amber-600" size={20} />
                          </motion.div>
                          <span className="text-lg">{event.time}</span>
                        </motion.div>

                        <motion.div
                          className="flex items-start text-slate-700 group/item"
                          whileHover={{ x: 10, scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <motion.div
                            className="mr-4 p-2 bg-slate-100 rounded-full group-hover/item:bg-amber-100 transition-colors mt-1 flex-shrink-0"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <MapPin className="text-slate-600 group-hover/item:text-amber-600" size={20} />
                          </motion.div>
                          <div>
                            <div className="font-semibold text-lg mb-1">{event.venue}</div>
                            <div className="text-slate-500 leading-relaxed">{event.location}</div>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Button className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white border-0 shadow-lg px-8 py-3 text-lg font-medium transition-all duration-300">
                          <MapPin className="mr-3" size={18} />
                          View Location
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatedDivider />

      {/* Enhanced Accommodation Section */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-0 shadow-2xl overflow-hidden relative">
          <CardContent className="p-12 md:p-16 relative">
            {/* Enhanced Background Elements */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full -mr-20 -mt-20"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/5 rounded-full -ml-16 -mb-16"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            <motion.h3
              className="text-4xl md:text-5xl font-serif mb-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              Need accommodation?
            </motion.h3>

            <motion.p
              className="text-xl text-slate-200 mb-12 leading-relaxed text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We're delighted to arrange comfortable accommodations for our cherished guests. Please select the events
              for which you need lodging:
            </motion.p>

            <div className="grid gap-6 mb-12 max-w-4xl mx-auto">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10 hover:border-amber-400/30"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => handleEventToggle(event.id)}
                >
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Checkbox
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={() => handleEventToggle(event.id)}
                      className="border-amber-300 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 w-6 h-6"
                    />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-slate-200 font-semibold text-lg">{event.title}</div>
                    <div className="text-slate-400 text-sm">
                      {event.date} • {event.location.split(",")[0]}
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      rotate: selectedEvents.includes(event.id) ? 360 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <event.icon size={24} className="text-amber-400" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-semibold px-12 py-4 text-xl transition-all duration-300 shadow-2xl border-0"
                  disabled={selectedEvents.length === 0}
                >
                  <motion.span
                    animate={selectedEvents.length > 0 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    Submit Accommodation Request
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <AnimatedDivider />

      {/* Enhanced RSVP Section */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-amber-200 shadow-2xl overflow-hidden relative">
          <CardContent className="p-12 md:p-16 text-center relative">
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d97706 0%, transparent 50%)`,
                backgroundSize: "400% 400%",
              }}
            />

            <motion.h3
              className="text-4xl md:text-5xl font-serif text-slate-800 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              RSVP Deadline
            </motion.h3>

            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl text-slate-700 leading-relaxed mb-6">
                Your presence would make our celebration complete. Kindly respond with your attendance and accommodation
                needs by
              </p>

              <motion.div
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                20 August 2026
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Enhanced Footer */}
      <motion.footer
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 75% 75%, #f59e0b 0%, transparent 50%)`,
            backgroundSize: "200% 200%",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.p
            className="flex items-center justify-center space-x-3 text-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span>Made with</span>
            <motion.span
              className="text-2xl"
              animate={{
                scale: [1, 1.3, 1],
                color: ["#ef4444", "#f97316", "#eab308", "#ef4444"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ♥
            </motion.span>
            <span>in TypeScript • © 2026 Lavanya & Vikas Sai</span>
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}
