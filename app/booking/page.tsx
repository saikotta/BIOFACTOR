"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import { 
  FiMail, 
  FiClock, 
  FiArrowRight,
  FiUser,
  FiX,
  FiCalendar,
  FiCheckCircle,
  FiArrowLeft
} from "react-icons/fi";
import BiofactorFooter from "../components/BiofactorFooter";

interface Room {
  id: number;
  name: string;
  type: string;
  capacity: number;
  image: string;
}

interface OccupiedSlot {
  room_name: string;
  start_time: string;
  end_time: string;
}

interface UserBooking {
  id: number | string;
  booker_name: string;
  booker_email: string;
  status: string;
  room_name?: string;
}

const getApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, "");
  }
  return "http://localhost:8000/api/v1";
};

const getLocalDate = (d = new Date()): string => {
  return d.toLocaleDateString("sv-SE"); // Returns YYYY-MM-DD in local time
};

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<"book" | "cancel" | "reschedule">("book");
  const [bookingForm, setBookingForm] = useState({
    booker_name: "",
    booker_email: "",
    booking_date: getLocalDate(),
    start_time: "",
    end_time: "",
    purpose: "",
    attendees_count: 1,
    room_name: "Main Conference Room",
    needs_food: false,
    food_count: 0,
    food_preference: "Veg",
    hotel_name: "",
    other_requirements: ""
  });

  const [cancelForm, setCancelForm] = useState({
    booker_email: "",
    booker_name: "",
    reason: ""
  });

  const [rescheduleForm, setRescheduleForm] = useState({
    booker_name: "",
    booker_email: "",
    new_date: getLocalDate(),
    new_start_time: "",
    new_end_time: ""
  });

  const [bookingStep, setBookingStep] = useState<"initial" | "selection" | "details">("initial");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [occupiedSlots, setOccupiedSlots] = useState<OccupiedSlot[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "" }>({ message: "", type: "" });

  const manageRef = useRef<HTMLDivElement | null>(null);
  const bookingFormRef = useRef<HTMLDivElement | null>(null);

  const rooms: Room[] = useMemo(() => [
    {
      id: 1,
      name: "Main Conference Room",
      type: "Conference Room",
      capacity: 25,
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1000"
    }
  ], []);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 5000);
  };

  const fetchOccupiedSlots = async (date: string) => {
    setFetchLoading(true);
    try {
      const base = getApiBaseUrl();
      const resp = await axios.get(`${base}/bookings/occupied?date=${date}`);
      setOccupiedSlots(resp.data?.data || []);
    } catch {
      // Graceful fallback for offline backend
      setOccupiedSlots([]);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (bookingForm.booking_date) {
      fetchOccupiedSlots(bookingForm.booking_date);
    }
  }, [bookingForm.booking_date]);

  const isTimeOccupied = (roomName: string, startTime: string, endTime: string): boolean => {
    if (!startTime || !endTime) return false;
    const formatTime = (t: string) => (t.split(":").length === 2 ? `${t}:00` : t);
    const s1 = formatTime(startTime);
    const e1 = formatTime(endTime);

    return occupiedSlots.some(slot => {
      if (slot.room_name !== roomName) return false;
      return s1 < slot.end_time && e1 > slot.start_time;
    });
  };

  const BookingTimeline = ({ roomName, occupiedSlots }: { roomName: string; occupiedSlots: OccupiedSlot[] }) => {
    const segments = Array.from({ length: 48 }, (_, i) => i);
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

    const getSegmentTime = (index: number) => {
      const hour = Math.floor(index / 2);
      const min = (index % 2) * 30;
      const ampm = hour >= 12 ? "PM" : "AM";
      const h12 = hour % 12 === 0 ? 12 : hour % 12;
      return `${h12}:${min.toString().padStart(2, "0")} ${ampm}`;
    };

    const isOccupied = (index: number) => {
      const hour = Math.floor(index / 2);
      const min = (index % 2) * 30;
      const sStr = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:00`;
      const nextIndex = index + 1;
      const nextHour = Math.floor(nextIndex / 2);
      const nextMin = (nextIndex % 2) * 30;
      const eStr = nextHour === 24 ? "23:59:59" : `${nextHour.toString().padStart(2, "0")}:${nextMin.toString().padStart(2, "0")}:00`;

      return occupiedSlots.some(slot => {
        if (slot.room_name !== roomName) return false;
        return sStr < slot.end_time && eStr > slot.start_time;
      });
    };

    return (
      <div className="w-full mt-4 relative group">
        <div className="flex h-5 bg-emerald-50 rounded overflow-hidden border border-emerald-100">
          {segments.map(s => (
            <div
              key={s}
              onMouseEnter={() => setHoveredSegment(s)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`flex-1 border-r border-white/20 last:border-0 transition-colors duration-150 ${
                isOccupied(s) ? "bg-red-500" : "bg-emerald-400/40"
              } hover:brightness-90 cursor-crosshair`}
            />
          ))}
        </div>

        {hoveredSegment !== null && (
          <div
            className="absolute top-[-36px] flex flex-col items-center pointer-events-none z-20"
            style={{ left: `${(hoveredSegment / 48) * 100}%`, transform: "translateX(-50%)" }}
          >
            <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap mb-1">
              {getSegmentTime(hoveredSegment)}
            </div>
            <div className="w-[1.5px] h-6 bg-slate-400"></div>
          </div>
        )}

        <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
          {[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44].map(idx => (
            <div key={idx} className="flex flex-col items-center">
              <div className="h-1 w-[1.5px] bg-slate-200 mb-0.5"></div>
              <span>{idx === 0 ? "12AM" : idx === 24 ? "12PM" : `${Math.floor(idx / 2) % 12}${idx < 24 ? "AM" : "PM"}`}</span>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <div className="h-1 w-[1.5px] bg-slate-200 mb-0.5"></div>
            <span>11PM</span>
          </div>
        </div>
      </div>
    );
  };

  const handleBookingSubmit = async (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!bookingForm.booker_email.endsWith("@biofactor.in")) {
      showToast("Only @biofactor.in email addresses are permitted to book the conference room.", "error");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...bookingForm,
      attendees_count: parseInt(String(bookingForm.attendees_count), 10) || 1,
      food_count: parseInt(String(bookingForm.food_count), 10) || 0
    };

    if (!payload.end_time && payload.start_time) {
      const [h, m] = payload.start_time.split(":").map(Number);
      const date = new Date();
      date.setHours(h, m + 30);
      payload.end_time = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    }

    try {
      const base = getApiBaseUrl();
      await axios.post(`${base}/bookings/`, payload);
      showToast("Conference room booked successfully! Confirmation email has been sent.", "success");
      setBookingForm({
        booker_name: "",
        booker_email: "",
        booking_date: getLocalDate(),
        start_time: "",
        end_time: "",
        purpose: "",
        attendees_count: 1,
        room_name: "Main Conference Room",
        needs_food: false,
        food_count: 0,
        food_preference: "Veg",
        hotel_name: "",
        other_requirements: ""
      });
      setBookingStep("initial");
      setSelectedRoom(null);
      fetchOccupiedSlots(bookingForm.booking_date);
    } catch (err: unknown) {
      const error = err as { response?: { status?: number; data?: { detail?: string | Array<{ msg: string }> } }; code?: string };
      let msg = error.response?.data?.detail;

      if (error.code === "ERR_NETWORK" || !error.response) {
        msg = "Unable to connect to the HRMS backend. Please ensure the backend server is running on port 8000.";
      } else if (Array.isArray(msg)) {
        msg = msg.map(item => item.msg).join(" | ");
      } else if (typeof msg !== "string") {
        if (error.response?.status === 500) {
          msg = "Booking recorded, but notification service failed. Please check your dashboard.";
        } else if (error.response?.status === 409) {
          msg = "Time slot is already occupied. Please choose another slot.";
        } else {
          msg = "An error occurred while booking. Please verify all details.";
        }
      }
      showToast(String(msg), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelForm.booker_email.endsWith("@biofactor.in")) {
      showToast("Only @biofactor.in email addresses are valid.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const base = getApiBaseUrl();
      const myBookings = await axios.get(`${base}/bookings/my?email=${encodeURIComponent(cancelForm.booker_email)}`);
      const list: UserBooking[] = myBookings.data?.data || [];
      const target = list.find(
        b => b.booker_name.toLowerCase() === cancelForm.booker_name.toLowerCase().trim() && b.status === "confirmed"
      );

      if (!target) {
        throw new Error("No active booking found for this name and email address.");
      }

      await axios.patch(`${base}/bookings/${target.id}/cancel`, {
        cancelled_by: "user",
        reason: cancelForm.reason,
        booker_email: cancelForm.booker_email
      });
      showToast("Booking cancelled successfully.", "success");
      setCancelForm({ booker_email: "", booker_name: "", reason: "" });
      setActiveTab("book");
      fetchOccupiedSlots(bookingForm.booking_date);
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { detail?: string } } };
      const msg = error.response?.data?.detail || error.message || "Failed to cancel booking.";
      showToast(String(msg), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleForm.booker_email.endsWith("@biofactor.in")) {
      showToast("Only @biofactor.in email addresses are valid.", "error");
      return;
    }

    if (isTimeOccupied("Main Conference Room", rescheduleForm.new_start_time, rescheduleForm.new_end_time)) {
      showToast("The new selected time is already occupied. Please pick another slot.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const base = getApiBaseUrl();
      const myBookings = await axios.get(`${base}/bookings/my?email=${encodeURIComponent(rescheduleForm.booker_email)}`);
      const list: UserBooking[] = myBookings.data?.data || [];
      const target = list.find(
        b => b.booker_name.toLowerCase() === rescheduleForm.booker_name.toLowerCase().trim() && b.status === "confirmed"
      );

      if (!target) {
        throw new Error("No active booking found for this name and email address.");
      }

      await axios.patch(`${base}/bookings/${target.id}/reschedule`, {
        booker_email: rescheduleForm.booker_email,
        new_date: rescheduleForm.new_date,
        new_start_time: rescheduleForm.new_start_time,
        new_end_time: rescheduleForm.new_end_time
      });
      showToast("Booking rescheduled successfully! New confirmation sent.", "success");
      setRescheduleForm({
        booker_name: "",
        booker_email: "",
        new_date: getLocalDate(),
        new_start_time: "",
        new_end_time: ""
      });
      setActiveTab("book");
      setBookingStep("initial");
      fetchOccupiedSlots(bookingForm.booking_date);
    } catch (err: unknown) {
      const error = err as { message?: string; response?: { data?: { detail?: string } } };
      const msg = error.response?.data?.detail || error.message || "Failed to reschedule booking.";
      showToast(String(msg), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50 flex flex-col justify-between pt-24 sm:pt-28">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/90 backdrop-blur-sm text-emerald-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-200/60 shadow-sm">
            <FiCalendar className="text-emerald-600" /> Internal Facility Reservation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Book Conference Room
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Reserve company meeting spaces seamlessly. All bookings are synced directly with the Biofactor HRMS dashboard.
          </p>

          {bookingStep === "initial" && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setBookingStep("selection")}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <FiCalendar size={18} />
                Book Conference Room
                <FiArrowRight />
              </button>

              <button
                onClick={() => {
                  setActiveTab("cancel");
                  setTimeout(() => manageRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 rounded-xl font-bold text-sm sm:text-base hover:bg-red-50/50 transition-all flex items-center gap-2 shadow-sm"
              >
                <FiX size={18} />
                Manage or Cancel
              </button>
            </div>
          )}
        </div>

        {/* Manage / Cancel / Reschedule Modal */}
        {activeTab !== "book" && (
          <div ref={manageRef} className="max-w-xl mx-auto mb-12 animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 relative">
              <button
                onClick={() => setActiveTab("book")}
                className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-900">Manage Reservation</h3>
                <p className="text-slate-500 text-sm font-medium">Cancel or reschedule your active conference room booking.</p>
              </div>

              <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("cancel")}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                    activeTab === "cancel" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Cancel Booking
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reschedule")}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                    activeTab === "reschedule" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Reschedule
                </button>
              </div>

              {activeTab === "cancel" ? (
                <form onSubmit={handleCancelSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={cancelForm.booker_name}
                      onChange={e => setCancelForm({ ...cancelForm, booker_name: e.target.value })}
                      placeholder="Your Full Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={cancelForm.booker_email}
                      onChange={e => setCancelForm({ ...cancelForm, booker_email: e.target.value })}
                      placeholder="name@biofactor.in"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Reason (Optional)</label>
                    <input
                      type="text"
                      value={cancelForm.reason}
                      onChange={e => setCancelForm({ ...cancelForm, reason: e.target.value })}
                      placeholder="e.g., Client meeting rescheduled"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm font-semibold outline-none"
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-200 text-sm transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Cancellation"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRescheduleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={rescheduleForm.booker_name}
                        onChange={e => setRescheduleForm({ ...rescheduleForm, booker_name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-semibold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        value={rescheduleForm.booker_email}
                        onChange={e => setRescheduleForm({ ...rescheduleForm, booker_email: e.target.value })}
                        placeholder="name@biofactor.in"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm font-semibold outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">New Date</label>
                      <input
                        type="date"
                        value={rescheduleForm.new_date}
                        onChange={e => {
                          setRescheduleForm({ ...rescheduleForm, new_date: e.target.value });
                          fetchOccupiedSlots(e.target.value);
                        }}
                        className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 outline-none"
                      />
                    </div>
                    <BookingTimeline roomName="Main Conference Room" occupiedSlots={occupiedSlots} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">New Start Time</label>
                      <input
                        required
                        type="time"
                        value={rescheduleForm.new_start_time}
                        onChange={e => setRescheduleForm({ ...rescheduleForm, new_start_time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">New End Time</label>
                      <input
                        required
                        type="time"
                        value={rescheduleForm.new_end_time}
                        onChange={e => setRescheduleForm({ ...rescheduleForm, new_end_time: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold outline-none"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-200 text-sm transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating..." : "Reschedule Booking"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Selection Step */}
        {bookingStep === "selection" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-center">
              <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <FiCalendar className="text-emerald-600 ml-2" size={18} />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Date:</span>
                <input
                  type="date"
                  value={bookingForm.booking_date}
                  onChange={e => setBookingForm({ ...bookingForm, booking_date: e.target.value })}
                  className="bg-transparent border-none text-slate-800 font-bold text-sm cursor-pointer outline-none"
                />
              </div>
            </div>

            {rooms.map(room => {
              const nowTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
              const isAvailableNow = !isTimeOccupied(room.name, nowTime, nowTime);

              return (
                <div key={room.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="w-full md:w-52 h-44 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900">{room.name}</h3>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">Capacity: {room.capacity} Persons • Projector & Video Conferencing</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-center ${
                            isAvailableNow ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {isAvailableNow ? "Available Now" : "Currently Occupied"}
                        </span>
                      </div>

                      <BookingTimeline roomName={room.name} occupiedSlots={occupiedSlots} />

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedRoom(room);
                            setBookingForm({ ...bookingForm, room_name: room.name });
                            setBookingStep("details");
                          }}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center gap-2 text-sm"
                        >
                          Book Now <FiArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center pt-2">
              <button
                onClick={() => setBookingStep("initial")}
                className="text-slate-600 hover:text-slate-900 font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <FiArrowLeft /> Back to Overview
              </button>
            </div>
          </div>
        )}

        {/* Details Form Step */}
        {bookingStep === "details" && selectedRoom && (
          <div ref={bookingFormRef} className="max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-5 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBookingStep("selection")}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
                  >
                    <FiArrowLeft size={16} />
                  </button>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Finalize Conference Reservation</h3>
                    <p className="text-xs text-slate-500 font-medium">{selectedRoom.name} • Biofactor Internal Facility</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form fields */}
                <div className="lg:col-span-7">
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="text"
                            placeholder="Your Full Name"
                            value={bookingForm.booker_name}
                            onChange={e => setBookingForm({ ...bookingForm, booker_name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Official Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            required
                            type="email"
                            placeholder="name@biofactor.in"
                            value={bookingForm.booker_email}
                            onChange={e => setBookingForm({ ...bookingForm, booker_email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="date"
                          value={bookingForm.booking_date}
                          onChange={e => setBookingForm({ ...bookingForm, booking_date: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          From Time <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="time"
                          value={bookingForm.start_time}
                          onChange={e => {
                            const newStart = e.target.value;
                            const [h, m] = newStart.split(":").map(Number);
                            const d = new Date();
                            d.setHours(h, m + 30);
                            const newEnd = `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
                            setBookingForm({ ...bookingForm, start_time: newStart, end_time: newEnd });
                          }}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          To Time <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="time"
                          value={bookingForm.end_time}
                          onChange={e => setBookingForm({ ...bookingForm, end_time: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Meeting Purpose / Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g., Q3 Strategy Review"
                          value={bookingForm.purpose}
                          onChange={e => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Attendees <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="number"
                          min="1"
                          max={selectedRoom.capacity}
                          value={bookingForm.attendees_count}
                          onChange={e => setBookingForm({ ...bookingForm, attendees_count: parseInt(e.target.value, 10) || 1 })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Food catering section */}
                    <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/60 space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={bookingForm.needs_food}
                          onChange={e => setBookingForm({ ...bookingForm, needs_food: e.target.checked })}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                        />
                        <span className="font-bold text-sm text-slate-800">Need Food / Refreshments Ordered?</span>
                      </label>

                      {bookingForm.needs_food && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Number of Meals</label>
                            <input
                              type="number"
                              min="1"
                              value={bookingForm.food_count}
                              onChange={e => setBookingForm({ ...bookingForm, food_count: parseInt(e.target.value, 10) || 0 })}
                              className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm font-semibold outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Preference</label>
                            <select
                              value={bookingForm.food_preference}
                              onChange={e => setBookingForm({ ...bookingForm, food_preference: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm font-semibold outline-none"
                            >
                              <option value="Veg">Vegetarian</option>
                              <option value="Non-Veg">Non-Vegetarian</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Caterer / Restaurant</label>
                            <input
                              type="text"
                              placeholder="Preferred Hotel"
                              value={bookingForm.hotel_name}
                              onChange={e => setBookingForm({ ...bookingForm, hotel_name: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm font-semibold outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Special Requirements / Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Projector setup, whiteboard markers, external guests, etc."
                        value={bookingForm.other_requirements}
                        onChange={e => setBookingForm({ ...bookingForm, other_requirements: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <FiClock className="animate-spin" size={18} /> Processing Reservation...
                        </>
                      ) : (
                        <>
                          Confirm Booking <FiCheckCircle size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Right sidebar schedule & guidelines */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <FiCalendar className="text-emerald-600" /> Slot Availability
                      </h4>
                      {fetchLoading && <FiClock className="animate-spin text-emerald-600 text-xs" />}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, booking_date: getLocalDate() })}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          bookingForm.booking_date === getLocalDate() ? "bg-emerald-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          setBookingForm({ ...bookingForm, booking_date: getLocalDate(tomorrow) });
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          bookingForm.booking_date === getLocalDate(new Date(Date.now() + 86400000))
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-white text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        Tomorrow
                      </button>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <BookingTimeline roomName="Main Conference Room" occupiedSlots={occupiedSlots} />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-emerald-900 text-sm mb-3">Facility Guidelines</h4>
                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                      <li className="flex gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        Only Biofactor team members with valid @biofactor.in email can book.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        Please arrive 5 minutes prior to your allocated slot.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        Ensure all lights, projector, and AC are switched off after your meeting.
                      </li>
                      <li className="flex gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        All reservations appear live in the HRMS administrative portal.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toast.message && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded-2xl shadow-2xl z-[9999] max-w-sm flex items-start gap-3 border transition-all animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === "error" ? "bg-red-50 text-red-900 border-red-200" : "bg-emerald-50 text-emerald-900 border-emerald-200"
          }`}
        >
          <div className="mt-0.5">
            {toast.type === "error" ? <FiX className="text-red-600 text-lg" /> : <FiCheckCircle className="text-emerald-600 text-lg" />}
          </div>
          <p className="font-semibold text-xs leading-relaxed">{toast.message}</p>
        </div>
      )}

      <BiofactorFooter />
    </div>
  );
}
