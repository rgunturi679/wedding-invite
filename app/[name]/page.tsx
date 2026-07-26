"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Gift,
  Users,
  Star,
  Sparkles,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "next/navigation";
import { FloatingParticles } from "@/components/floating-particles";
import { AnimatedDivider } from "@/components/animated-divider";
import { CountdownTimer } from "@/components/countdown-timer";
import { apiCall } from "@/lib/config";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  icon: any;
  color: string;
  shadowColor: string;
  description: string;
  maps: string;
}

export default function PersonalizedWeddingInvitation() {
  const params = useParams();
  const guestName = params.name as string;

  // Format the guest name (capitalize first letter, handle special cases)
  const formatGuestName = (name: string) => {
    if (!name) return "Guest";
    const decodedName = decodeURIComponent(name)
      .replace(/[-_]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    return decodedName;
  };

  const formattedGuestName = formatGuestName(guestName);

  // All state declarations
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isSubmittingAccommodation, setIsSubmittingAccommodation] =
    useState(false);
  const [accommodationSuccess, setAccommodationSuccess] = useState(false);
  const [accommodationError, setAccommodationError] = useState<string | null>(
    null,
  );
  const [isSubmittingRSVP, setIsSubmittingRSVP] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<
    "pending" | "attending" | "not-attending"
  >("pending");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const headerY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.3], [1, 0.8]);

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  // Function to handle location click
  const handleViewLocation = (mapsUrl: string, eventTitle: string) => {
    console.log(`Opening location for ${eventTitle}:`, mapsUrl);
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  // API call for accommodation request
  const handleAccommodationSubmit = async () => {
    if (selectedEvents.length === 0) return;

    setIsSubmittingAccommodation(true);
    setAccommodationError(null);

    try {
      const data = await apiCall("/api/accommodation", {
        method: "POST",
        body: JSON.stringify({
          guestName: formattedGuestName,
          selectedEvents,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("Accommodation request submitted:", data);
      setAccommodationSuccess(true);
      setSelectedEvents([]);
      setTimeout(() => setAccommodationSuccess(false), 3000);
    } catch (error) {
      console.error("Accommodation submission error:", error);
      setAccommodationError("Failed to submit request. Please try again.");
      setTimeout(() => setAccommodationError(null), 5000);
    } finally {
      setIsSubmittingAccommodation(false);
    }
  };

  // API call for RSVP
  const handleRSVPSubmit = async (status: "attending" | "not-attending") => {
    setIsSubmittingRSVP(true);
    setRsvpError(null);

    try {
      const data = await apiCall("/api/rsvp", {
        method: "POST",
        body: JSON.stringify({
          guestName: formattedGuestName,
          status,
          selectedEvents: status === "attending" ? selectedEvents : [],
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("RSVP submitted:", data);
      setRsvpStatus(status);
      setRsvpSuccess(true);
      setTimeout(() => setRsvpSuccess(false), 3000);
    } catch (error) {
      console.error("RSVP submission error:", error);
      setRsvpError("Failed to submit RSVP. Please try again.");
      setTimeout(() => setRsvpError(null), 5000);
    } finally {
      setIsSubmittingRSVP(false);
    }
  };

  // API call for contact/inquiry
  const handleContactSubmit = async (message: string) => {
    try {
      const data = await apiCall("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          guestName: formattedGuestName,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("Contact message sent:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Contact submission error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again.",
      };
    }
  };

  const events: EventItem[] = [
    {
      id: "haldi",
      title: "Haldi",
      date: "26 August 2026",
      time: "3:00 PM onwards",
      venue: "B R R Convention Hall, Near Kovvur Bus Stand",
      location: "Kovvur, Rajahmundry",
      icon: Gift,
      color: "from-yellow-600 via-amber-500 to-yellow-600",
      shadowColor: "shadow-yellow-500/30",
      description: "Join us for the auspicious Haldi ceremony",
      maps: "https://maps.app.goo.gl/Nk3cfi19ZbGobZob6?g_st=ac",
    },
    {
      id: "sangeet",
      title: "Sangeet",
      date: "27 August 2026",
      time: "9:30 AM onwards",
      venue: "B R R Convention Hall, Near Kovvur Bus Stand",
      location: "Kovvur, Rajahmundry",
      icon: Users,
      color: "from-purple-600 via-fuchsia-500 to-pink-600",
      shadowColor: "shadow-purple-500/30",
      description: "An evening of music, dance, and merriment",
      maps: "https://maps.app.goo.gl/Nk3cfi19ZbGobZob6?g_st=ac",
    },
    {
      id: "wedding",
      title: "Wedding",
      date: "27 August 2026",
      time: "7:30 PM onwards",
      venue: "B R R Convention Hall, Near Kovvur Bus Stand",
      location: "Kovvur, Rajahmundry",
      icon: Heart,
      color: "from-red-600 via-rose-500 to-pink-600",
      shadowColor: "shadow-red-500/30",
      description: "Join us for the sacred ceremony and celebration",
      maps: "https://maps.app.goo.gl/Nk3cfi19ZbGobZob6?g_st=ac",
    },
    {
      id: "reception",
      title: "Reception",
      date: "02 September 2026",
      time: "6:30 PM onwards",
      venue: "VMRDA Children's Arena",
      location: "Near HP Petrol Pump, Siripuram, Visakhapatnam",
      icon: Gift,
      color: "from-amber-500 via-orange-500 to-red-500",
      shadowColor: "shadow-orange-500/30",
      description: "A grand reception to celebrate our union",
      maps: "https://maps.app.goo.gl/AgM5T4HYKsmEQPa39?g_st=ac",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fecaca 50%, #f3e8ff 75%, #fef3c7 100%),
          radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
        `
      }}
    >
      {/* Indian Wedding Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #d97706 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, #dc2626 1px, transparent 1px),
            linear-gradient(45deg, transparent 46%, #7c3aed 49%, #7c3aed 51%, transparent 54%),
            linear-gradient(-45deg, transparent 46%, #ec4899 49%, #ec4899 51%, transparent 54%)
          `,
          backgroundSize: '50px 50px, 100px 100px, 60px 60px, 60px 60px'
        }}
      />
      
      {/* Floating Mandala Patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <div className="w-full h-full border-4 border-amber-400 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-rose-400 rounded-full"></div>
          <div className="absolute inset-8 border-2 border-purple-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-16 w-24 h-24 opacity-10">
          <div className="w-full h-full border-4 border-pink-400 rounded-full"></div>
          <div className="absolute inset-3 border-2 border-orange-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 opacity-10">
          <div className="w-full h-full border-4 border-indigo-400 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-amber-400 rounded-full"></div>
          <div className="absolute inset-8 border-2 border-rose-400 rounded-full"></div>
        </div>
      </div>

      <FloatingParticles />

      {/* Header Section with Background Image */}
      <motion.header
        className="relative overflow-hidden min-h-screen flex items-center justify-center"
        style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
      >
        <div className="absolute inset-0">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-no-repeat bg-center"
            style={{
              backgroundImage: "url('/images/engagement.jpg')",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 50%, rgba(15, 23, 42, 0.6) 100%)"
            }}
            animate={{
              background: [
                "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 50%, rgba(15, 23, 42, 0.6) 100%)",
                "linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(51, 65, 85, 0.3) 50%, rgba(30, 41, 59, 0.5) 100%)",
                "linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 50%, rgba(15, 23, 42, 0.6) 100%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Personalized Greeting */}
            <motion.div
              className="mb-12"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <motion.p className="text-2xl md:text-3xl text-amber-300 font-light tracking-wide mb-4">
                Hey{" "}
                <span className="font-semibold text-amber-200 text-3xl md:text-4xl">
                  {formattedGuestName}
                </span>
                ,
              </motion.p>
              <motion.p className="text-xl md:text-2xl text-slate-200 font-light">
                We are joyfully inviting you to celebrate with us
              </motion.p>
            </motion.div>

            {/* Crown Icon */}
            <motion.div className="mb-8">
              <Crown
                size={60}
                className="text-amber-400 mx-auto drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              className="text-7xl md:text-9xl font-serif text-amber-100 mb-8 tracking-wide"
              style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'
              }}
            >
              <span className="inline-block">Lavanya</span>
              <span className="text-amber-300 mx-4 inline-block">&</span>
              <span className="inline-block">Vikas Sai</span>
            </motion.h1>

            {/* Divider */}
            <motion.div className="flex items-center justify-center mb-10">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-400" />
              <div className="mx-6">
                <Sparkles size={24} className="text-amber-400 drop-shadow-lg" />
              </div>
              <div className="w-20 h-px bg-gradient-to-l from-transparent via-amber-400 to-amber-400" />
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-slate-200 font-light mb-4 max-w-3xl mx-auto leading-relaxed"
              style={{ 
                textShadow: '1px 1px 4px rgba(0,0,0,0.8)' 
              }}
            >
              Your presence would make our special day even more meaningful.{" "}
              <span className="text-amber-200 font-medium">
                {formattedGuestName}
              </span>
              , we can't wait to celebrate with you!
            </motion.p>

            <CountdownTimer />
          </motion.div>
        </div>
      </motion.header>

      <AnimatedDivider />

      {/* Events Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-20 relative">
          {/* Decorative Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-64 h-64 border-8 border-red-400 rounded-full"></div>
            <div className="absolute w-48 h-48 border-4 border-orange-400 rounded-full"></div>
            <div className="absolute w-32 h-32 border-4 border-pink-400 rounded-full"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-red-800 mb-6 relative z-10">
            Celebration Events
          </h2>
          <p className="text-xl text-orange-700 max-w-2xl mx-auto leading-relaxed relative z-10">
            <span className="text-red-700 font-medium">
              {formattedGuestName}
            </span>
            , join us for these special moments as we begin our journey together
          </p>
        </div>

        <div className="space-y-16">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`overflow-hidden border-0 shadow-2xl ${event.shadowColor} bg-white/90`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Event Icon */}
                    <div
                      className={`lg:w-2/5 bg-gradient-to-br ${event.color} p-12 flex flex-col items-center justify-center`}
                    >
                      <event.icon
                        size={100}
                        className="text-white drop-shadow-2xl mb-4"
                      />
                      <h3 className="text-2xl font-serif text-white/90 tracking-wide">
                        {event.title}
                      </h3>
                    </div>

                    {/* Event Details */}
                    <div className="lg:w-3/5 p-12">
                      <h3 className="text-4xl font-serif text-slate-800 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-slate-700">
                          <div className="mr-4 p-2 bg-slate-100 rounded-full">
                            <Calendar className="text-slate-600" size={20} />
                          </div>
                          <span className="font-semibold text-lg">
                            {event.date}
                          </span>
                        </div>

                        <div className="flex items-center text-slate-700">
                          <div className="mr-4 p-2 bg-slate-100 rounded-full">
                            <Clock className="text-slate-600" size={20} />
                          </div>
                          <span className="text-lg">{event.time}</span>
                        </div>

                        <div className="flex items-start text-slate-700">
                          <div className="mr-4 p-2 bg-slate-100 rounded-full mt-1 flex-shrink-0">
                            <MapPin className="text-slate-600" size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-lg mb-1">
                              {event.venue}
                            </div>
                            <div className="text-slate-500 leading-relaxed">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg px-8 py-3 text-lg font-medium"
                        onClick={() =>
                          handleViewLocation(event.maps, event.title)
                        }
                      >
                        <MapPin className="mr-3" size={18} />
                        View Location
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatedDivider />

      {/* Accommodation Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-900 text-white border-0 shadow-2xl overflow-hidden relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-400 rounded-full"></div>
            <div className="absolute top-8 left-8 w-8 h-8 border-2 border-pink-400 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 border-2 border-orange-400 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-red-400 rounded-full"></div>
          </div>
          
          <CardContent className="p-12 md:p-16 relative z-10">
            <h3 className="text-4xl md:text-5xl font-serif mb-8 text-center text-yellow-200">
              Need accommodation, {formattedGuestName}?
            </h3>

            <p className="text-xl text-pink-100 mb-12 leading-relaxed text-center max-w-3xl mx-auto">
              We'd be delighted to arrange comfortable accommodations for you,{" "}
              <span className="text-yellow-300 font-medium">
                {formattedGuestName}
              </span>
              . Please select the events for which you need lodging:
            </p>

            <div className="grid gap-6 mb-12 max-w-4xl mx-auto">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center space-x-4 p-6 rounded-2xl transition-all cursor-pointer border backdrop-blur-sm ${
                    selectedEvents.includes(event.id)
                      ? "bg-yellow-400/20 border-yellow-400 shadow-lg shadow-yellow-400/30"
                      : "bg-white/10 hover:bg-white/20 border-white/20"
                  }`}
                  onClick={() => handleEventToggle(event.id)}
                >
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={() => handleEventToggle(event.id)}
                      className="w-6 h-6 border-yellow-400"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-yellow-200 font-semibold text-lg">
                      {event.title}
                    </div>
                    <div className="text-pink-200 text-sm">
                      {event.date} • {event.location.split(",")[0]}
                    </div>
                  </div>
                  <event.icon size={24} className="text-yellow-400 flex-shrink-0" />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                className={`px-12 py-4 text-xl font-semibold transition-all duration-300 ${
                  selectedEvents.length === 0 || isSubmittingAccommodation
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-red-500 text-purple-900 shadow-lg"
                }`}
                disabled={
                  selectedEvents.length === 0 || isSubmittingAccommodation
                }
                onClick={handleAccommodationSubmit}
              >
                {isSubmittingAccommodation ? (
                  <>
                    <div className="inline-block w-4 h-4 border-2 border-purple-900 border-t-transparent rounded-full mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  `Submit Request for ${formattedGuestName}`
                )}
              </Button>

              {/* Success/Error Messages */}
              {accommodationSuccess && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                  ✅ Accommodation request submitted successfully!
                </div>
              )}

              {accommodationError && (
                <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                  ❌ {accommodationError}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <AnimatedDivider />

      {/* RSVP Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 border-orange-200 shadow-2xl overflow-hidden relative">
          {/* Decorative Indian Patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8">
              <div className="w-12 h-12 border-4 border-red-500 rotate-45"></div>
              <div className="absolute inset-2 w-8 h-8 border-2 border-orange-500 rotate-45"></div>
            </div>
            <div className="absolute top-8 right-8">
              <div className="w-16 h-16 border-4 border-pink-500 rounded-full"></div>
              <div className="absolute inset-3 w-10 h-10 border-2 border-purple-500 rounded-full"></div>
            </div>
            <div className="absolute bottom-8 left-8">
              <div className="w-14 h-14 border-4 border-amber-500"></div>
              <div className="absolute inset-2 w-10 h-10 border-2 border-red-500"></div>
            </div>
            <div className="absolute bottom-8 right-8">
              <div className="w-12 h-12 border-4 border-fuchsia-500 rotate-45 rounded-lg"></div>
              <div className="absolute inset-2 w-8 h-8 border-2 border-orange-500 rotate-45 rounded-lg"></div>
            </div>
          </div>
          
          <CardContent className="p-12 md:p-16 text-center relative z-10">
            <h3 className="text-4xl md:text-5xl font-serif text-red-800 mb-8">
              RSVP Deadline
            </h3>

            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-orange-800 leading-relaxed mb-8">
                <span className="text-red-700 font-semibold">
                  {formattedGuestName}
                </span>
                , your presence would make our celebration complete. Kindly
                respond with your attendance by
              </p>

              <div className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-lg mb-8">
                20 August 2026
              </div>

              {/* RSVP Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                    rsvpStatus === "attending"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  } text-white shadow-lg ${
                    isSubmittingRSVP ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmittingRSVP}
                  onClick={() => handleRSVPSubmit("attending")}
                >
                  {isSubmittingRSVP ? (
                    <>
                      <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {rsvpStatus === "attending" ? "✅" : "💚"} Yes, I'll be
                      there!
                    </>
                  )}
                </Button>

                <Button
                  className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                    rsvpStatus === "not-attending"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  } text-white shadow-lg ${
                    isSubmittingRSVP ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmittingRSVP}
                  onClick={() => handleRSVPSubmit("not-attending")}
                >
                  {rsvpStatus === "not-attending" ? "✅" : "😔"} Can't make it
                </Button>
              </div>

              {/* RSVP Success/Error Messages */}
              {rsvpSuccess && (
                <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                  ✅ RSVP submitted successfully! Thank you,{" "}
                  {formattedGuestName}!
                </div>
              )}

              {rsvpError && (
                <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                  ❌ {rsvpError}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-purple-200 shadow-2xl overflow-hidden relative">
          {/* Decorative Lotus Patterns */}
          <div className="absolute inset-0 opacity-8">
            <div className="absolute top-6 left-6">
              <div className="w-8 h-8 bg-pink-300 rounded-full"></div>
              <div className="absolute inset-1 w-6 h-6 bg-purple-300 rounded-full"></div>
              <div className="absolute inset-2 w-4 h-4 bg-indigo-300 rounded-full"></div>
            </div>
            <div className="absolute top-6 right-6">
              <div className="w-10 h-10 bg-fuchsia-300 transform rotate-45"></div>
              <div className="absolute inset-1 w-8 h-8 bg-violet-300 transform rotate-45"></div>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="w-12 h-12 border-4 border-pink-300 rounded-full"></div>
              <div className="absolute inset-2 w-8 h-8 border-2 border-purple-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-6 right-6">
              <div className="w-8 h-8 bg-indigo-300 transform rotate-45 rounded-sm"></div>
              <div className="absolute inset-1 w-6 h-6 bg-fuchsia-300 transform rotate-45 rounded-sm"></div>
            </div>
          </div>
          
          <CardContent className="p-12 md:p-16 text-center relative z-10">
            <h3 className="text-4xl md:text-5xl font-serif text-purple-800 mb-8">
              Questions or Special Requests?
            </h3>

            <p className="text-xl text-indigo-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              <span className="text-purple-700 font-semibold">
                {formattedGuestName}
              </span>
              , feel free to reach out if you have any questions about the
              events or special requests!
            </p>

            <ContactForm
              guestName={formattedGuestName}
              onSubmit={handleContactSubmit}
            />
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 via-pink-800 to-purple-900 text-pink-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center space-x-3 text-lg mb-4">
            <span>Made with</span>
            <span className="text-2xl text-yellow-400">♥</span>
            <span>in TypeScript • © 2026 Lavanya & Vikas Sai</span>
          </p>
          <p className="text-pink-200 text-sm mb-4">
            Personalized invitation for{" "}
            <span className="text-yellow-300 font-medium">
              {formattedGuestName}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Contact Form Component
function ContactForm({
  guestName,
  onSubmit,
}: {
  guestName: string;
  onSubmit: (
    message: string,
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
}) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const result = await onSubmit(message);

    if (result.success) {
      setSuccess(true);
      setMessage("");
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Failed to send message");
      setTimeout(() => setError(null), 5000);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-6">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi Lavanya & Vikas Sai! I'm so excited for your wedding..."
          className="w-full p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none h-32 text-purple-800 bg-white/80 backdrop-blur-sm"
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
          !message.trim() || isSubmitting
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg"
        }`}
        disabled={!message.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "💌 Send Message"
        )}
      </Button>

      {/* Success/Error Messages */}
      {success && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
          ✅ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
          ❌ {error}
        </div>
      )}
    </form>
  );
}
