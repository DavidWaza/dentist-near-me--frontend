"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkle } from "@/components/icons";
import { getSpecialistForService, LOCATIONS, SERVICES, type Doctor } from "@/lib/content";
import {
  dayHasAvailability,
  extendsPastClosing,
  formatAppointmentEndTime,
  formatClosingTime,
  formatSlotLabel,
  getAvailableSlots,
  getUpcomingDays,
  toStartsAt,
  type BookedSlotsByDay,
  type DayOption,
} from "@/lib/scheduling";
import { bookAppointment, fetchAvailability } from "@/lib/supabase";
import OvertimeDisclaimer from "@/components/OvertimeDisclaimer";

const STEPS = ["Service", "Date & Time", "Your Details"] as const;

function isValidServiceSlug(slug?: string): slug is string {
  return Boolean(slug && SERVICES.some((s) => s.slug === slug));
}

function initialStepForService(slug?: string): number {
  return isValidServiceSlug(slug) ? 1 : 0;
}

interface BookingFormProps {
  initialService?: string;
}

interface PatientDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success"; demo: boolean; emailed: boolean; emailErrors?: string[] };

export default function BookingForm({ initialService }: BookingFormProps) {
  const reduceMotion = useReducedMotion();
  const days = useMemo(() => getUpcomingDays(14), []);

  const [step, setStep] = useState(() => initialStepForService(initialService));
  const [service, setService] = useState(
    () => SERVICES.find((s) => s.slug === initialService)?.slug ?? ""
  );
  const [assignedSpecialist, setAssignedSpecialist] = useState<Doctor | null>(() =>
    initialService ? getSpecialistForService(initialService) : null
  );
  const [day, setDay] = useState<DayOption | null>(null);
  const [time, setTime] = useState("");
  const [details, setDetails] = useState<PatientDetails>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [bookedSlots, setBookedSlots] = useState<BookedSlotsByDay>({});
  const [availabilityStatus, setAvailabilityStatus] = useState<"idle" | "loading" | "ready">(
    "idle"
  );
  const [overtimeAcknowledged, setOvertimeAcknowledged] = useState(false);

  const selectedService = SERVICES.find((s) => s.slug === service);
  const clinicLocation = useMemo(
    () => (assignedSpecialist ? LOCATIONS.find((l) => l.city === assignedSpecialist.locationCity) : null),
    [assignedSpecialist]
  );

  const slots = useMemo(
    () => (day ? getAvailableSlots(day, bookedSlots) : []),
    [day, bookedSlots]
  );

  const overtimeApplies = useMemo(() => {
    if (!day || !time || !selectedService) return false;
    return extendsPastClosing(day, time, selectedService.durationMinutes);
  }, [day, time, selectedService]);

  useEffect(() => {
    if (step !== 1 || !service) return;

    const specialist = getSpecialistForService(service);
    setAssignedSpecialist(specialist);
    if (!specialist) {
      setAvailabilityStatus("ready");
      return;
    }

    let cancelled = false;
    setAvailabilityStatus("loading");

    const from = days[0]?.iso;
    const to = days[days.length - 1]?.iso;
    if (!from || !to) {
      setAvailabilityStatus("ready");
      return;
    }

    fetchAvailability(service, from, to).then(({ booked }) => {
      if (cancelled) return;
      setBookedSlots(booked);
      setAvailabilityStatus("ready");
    });

    return () => {
      cancelled = true;
    };
  }, [step, service, days]);

  useEffect(() => {
    setOvertimeAcknowledged(false);
  }, [day?.iso, time, service]);

  useEffect(() => {
    if (!day || !time) return;
    if (!getAvailableSlots(day, bookedSlots).includes(time)) {
      setTime("");
    }
  }, [day, time, bookedSlots]);

  useEffect(() => {
    if (!day || dayHasAvailability(day, bookedSlots)) return;
    setDay(null);
    setTime("");
  }, [day, bookedSlots]);

  function handleServiceSelect(slug: string) {
    setService(slug);
    setAssignedSpecialist(getSpecialistForService(slug));
    setDay(null);
    setTime("");
    setBookedSlots({});
    setAvailabilityStatus("idle");
  }

  const canContinue =
    (step === 0 && service !== "" && assignedSpecialist !== null) ||
    (step === 1 && day !== null && time !== "");

  const canSubmit =
    submit.status !== "submitting" && (!overtimeApplies || overtimeAcknowledged);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!day || !time || !selectedService || !assignedSpecialist) return;
    if (overtimeApplies && !overtimeAcknowledged) return;

    setSubmit({ status: "submitting" });
    const result = await bookAppointment({
      service_slug: selectedService.slug,
      starts_at: toStartsAt(day.iso, time),
      patient_name: details.name.trim(),
      patient_email: details.email.trim(),
      patient_phone: details.phone.trim(),
      notes: details.notes.trim() || undefined,
    });

    setSubmit(
      result.ok
        ? {
            status: "success",
            demo: result.demo,
            emailed: result.emailed,
            emailErrors: result.emailErrors,
          }
        : { status: "error", message: result.message }
    );
  }

  const stepMotion = {
    initial: { opacity: 0, x: reduceMotion ? 0 : 36 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduceMotion ? 0 : -36 },
    transition: { duration: 0.3, ease: "easeOut" as const },
  };

  /* ---------------------------------------------------------------- */
  /* Success screen                                                    */
  /* ---------------------------------------------------------------- */
  if (submit.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-blob bg-panel-gradient p-8 text-center text-white shadow-card sm:p-12"
      >
        <span className="eyebrow-dark">
          <Sparkle className="h-3 w-3 text-teal-light" /> Booking received
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          See you soon, {details.name.split(" ")[0] || "friend"}!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75">
          {selectedService?.title} with {assignedSpecialist?.name} · {day?.weekday}, {day?.month}{" "}
          {day?.day} at {formatSlotLabel(time)}
          {clinicLocation ? ` · ${clinicLocation.city}` : ""}.
          {submit.emailed
            ? " We've notified the clinic about your appointment."
            : " Your appointment is saved, but we couldn't notify the clinic by email."}
        </p>
        {submit.demo && (
          <p className="mx-auto mt-4 max-w-md rounded-xl bg-white/10 px-4 py-2.5 text-xs text-white/70">
            Demo mode — connect Supabase in .env.local to save bookings to the database.
          </p>
        )}
        {!submit.emailed && submit.emailErrors?.length ? (
          <p className="mx-auto mt-4 max-w-md rounded-xl bg-white/10 px-4 py-2.5 text-xs text-white/70">
            Email issue: {submit.emailErrors[0]}
          </p>
        ) : null}
        <Link href="/" className="btn-pill-light mt-7">
          Back to Home
          <span className="arrow-badge">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-blob bg-white p-6 shadow-card ring-1 ring-deep/5 sm:p-9">
      {/* Stepper */}
      <ol className="flex items-center gap-2" aria-label="Booking progress">
        {STEPS.map((label, index) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={`h-1.5 rounded-full transition-colors ${
                index <= step ? "bg-teal" : "bg-mint"
              }`}
            />
            <span
              className={`hidden text-[11px] font-semibold sm:block ${
                index === step ? "text-deep" : "text-ink-soft/70"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} className="mt-7 min-w-0">
        <AnimatePresence mode="wait">
          {/* STEP 1 — Service */}
          {step === 0 && (
            <motion.fieldset key="service" {...stepMotion}>
              <legend className="text-xl font-bold">Choose a service</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {SERVICES.map((option) => (
                  <button
                    key={option.slug}
                    type="button"
                    onClick={() => handleServiceSelect(option.slug)}
                    aria-pressed={service === option.slug}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      service === option.slug
                        ? "border-teal bg-mint-light ring-2 ring-teal/40"
                        : "border-deep/10 hover:border-teal/50"
                    }`}
                  >
                    <span className="flex items-center justify-between font-mono text-xs text-ink-soft">
                      {option.index}
                      <span className="rounded-full bg-mint px-2 py-0.5 font-sans font-semibold text-deep">
                        {option.durationMinutes} min
                      </span>
                    </span>
                    <p className="mt-1 text-sm font-bold">{option.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{option.copy}</p>
                  </button>
                ))}
              </div>
            </motion.fieldset>
          )}

          {/* STEP 2 — Assigned specialist + date & time */}
          {step === 1 && (
            <motion.fieldset key="datetime" {...stepMotion} className="min-w-0 overflow-hidden">
              <legend className="text-xl font-bold">Choose date &amp; time</legend>
              {selectedService && (
                <p className="mt-2 text-sm text-ink-soft">
                  {selectedService.title} · {selectedService.durationMinutes} min
                </p>
              )}

              {assignedSpecialist ? (
                <div className="mt-4 flex items-center gap-4 rounded-2xl border border-teal/20 bg-mint-light p-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-teal/30">
                    <Image
                      src={assignedSpecialist.image}
                      alt={assignedSpecialist.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                      Your assigned specialist
                    </p>
                    <p className="text-sm font-bold">{assignedSpecialist.name}</p>
                    <p className="text-xs text-ink-soft">{assignedSpecialist.role}</p>
                    {clinicLocation && (
                      <p className="mt-0.5 text-xs text-ink-soft">
                        {clinicLocation.city} — {clinicLocation.line}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  No specialist is available for this service. Please go back and choose another.
                </p>
              )}

              <div className="mt-5 min-w-0 overflow-x-auto pb-2 [scrollbar-width:thin]">
                <div className="flex w-max min-w-full gap-2">
                  {days.map((option) => {
                    const hasSlots =
                      availabilityStatus === "ready" && dayHasAvailability(option, bookedSlots);
                    const isFullyBooked = availabilityStatus === "ready" && !hasSlots;

                    return (
                      <button
                        key={option.iso}
                        type="button"
                        disabled={isFullyBooked || !assignedSpecialist}
                        onClick={() => {
                          setDay(option);
                          setTime("");
                        }}
                        aria-pressed={day?.iso === option.iso}
                        aria-disabled={isFullyBooked}
                        className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-3 transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                          day?.iso === option.iso
                            ? "border-teal bg-deep text-white"
                            : isFullyBooked
                              ? "border-deep/10 bg-mint-light/50"
                              : "border-deep/10 hover:border-teal/50"
                        }`}
                      >
                        <span className="text-[10px] font-semibold uppercase opacity-70">
                          {option.weekday}
                        </span>
                        <span className="text-lg font-bold">{option.day}</span>
                        <span className="text-[10px] opacity-70">{option.month}</span>
                        {isFullyBooked && (
                          <span className="mt-1 text-[9px] font-semibold uppercase text-ink-soft">
                            Full
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {day ? (
                availabilityStatus === "loading" ? (
                  <p className="mt-5 rounded-xl bg-mint-light px-4 py-3 text-sm text-ink-soft">
                    Loading available times…
                  </p>
                ) : slots.length > 0 ? (
                  <>
                    <div className="mt-5 grid w-full min-w-0 grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                      {slots.map((slot) => {
                        const slotHasOvertime =
                          selectedService &&
                          extendsPastClosing(day, slot, selectedService.durationMinutes);

                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            aria-pressed={time === slot}
                            className={`min-w-0 rounded-xl border px-1 py-2.5 text-xs font-semibold transition-all ${
                              time === slot
                                ? "border-teal bg-mint-light ring-2 ring-teal/40"
                                : slotHasOvertime
                                  ? "border-amber-300/80 bg-amber-50/80 hover:border-amber-400"
                                  : "border-deep/10 hover:border-teal/50"
                            }`}
                          >
                            {formatSlotLabel(slot)}
                          </button>
                        );
                      })}
                    </div>
                    {overtimeApplies && selectedService && day && time && (
                      <div className="mt-4">
                        <OvertimeDisclaimer
                          serviceTitle={selectedService.title}
                          durationMinutes={selectedService.durationMinutes}
                          startLabel={formatSlotLabel(time)}
                          endLabel={formatAppointmentEndTime(time, selectedService.durationMinutes)}
                          closingLabel={formatClosingTime(day)}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="mt-5 rounded-xl bg-mint-light px-4 py-3 text-sm text-ink-soft">
                    No times left on this day — please pick another date.
                  </p>
                )
              ) : (
                <p className="mt-5 rounded-xl bg-mint-light px-4 py-3 text-sm text-ink-soft">
                  Select a day above to see available times.
                </p>
              )}
            </motion.fieldset>
          )}

          {/* STEP 3 — Details */}
          {step === 2 && (
            <motion.fieldset key="details" {...stepMotion}>
              <legend className="text-xl font-bold">Your details</legend>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Full name"
                  value={details.name}
                  required
                  minLength={2}
                  autoComplete="name"
                  onChange={(value) => setDetails((d) => ({ ...d, name: value }))}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={details.email}
                  required
                  autoComplete="email"
                  onChange={(value) => setDetails((d) => ({ ...d, email: value }))}
                />
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={details.phone}
                  required
                  minLength={7}
                  autoComplete="tel"
                  onChange={(value) => setDetails((d) => ({ ...d, phone: value }))}
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="text-sm font-bold">
                    Notes <span className="font-normal text-ink-soft">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    maxLength={1000}
                    value={details.notes}
                    onChange={(event) =>
                      setDetails((d) => ({ ...d, notes: event.target.value }))
                    }
                    placeholder="Anything we should know — anxiety, allergies, insurance…"
                    className="mt-2 w-full rounded-xl border border-deep/15 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="mt-5 rounded-2xl bg-mint-light p-4 text-sm">
                <p className="font-bold">Appointment summary</p>
                <p className="mt-1 text-ink-soft">
                  {selectedService?.title}
                  {selectedService ? ` (${selectedService.durationMinutes} min)` : ""} ·{" "}
                  {assignedSpecialist?.name} · {day?.weekday}, {day?.month} {day?.day} at{" "}
                  {time ? formatSlotLabel(time) : "—"}
                  {clinicLocation ? ` · ${clinicLocation.city}` : ""}
                </p>
              </div>

              {overtimeApplies && selectedService && day && time && (
                <div className="mt-5">
                  <OvertimeDisclaimer
                    serviceTitle={selectedService.title}
                    durationMinutes={selectedService.durationMinutes}
                    startLabel={formatSlotLabel(time)}
                    endLabel={formatAppointmentEndTime(time, selectedService.durationMinutes)}
                    closingLabel={formatClosingTime(day)}
                    showAcknowledgment
                    acknowledged={overtimeAcknowledged}
                    onAcknowledgeChange={setOvertimeAcknowledged}
                  />
                </div>
              )}

              {submit.status === "error" && (
                <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {submit.message}
                </p>
              )}
            </motion.fieldset>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-full px-5 py-3 text-sm font-semibold text-ink-soft transition-colors hover:text-deep disabled:invisible"
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue}
              className="btn-pill disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <span className="arrow-badge">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-pill disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submit.status === "submitting" ? "Booking…" : "Confirm Booking"}
              <span className="arrow-badge">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------- */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}

function Field({ id, label, value, onChange, type = "text", required, minLength, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-deep/15 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
      />
    </div>
  );
}
