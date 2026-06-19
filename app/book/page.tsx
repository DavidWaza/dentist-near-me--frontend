import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book your DentistNearMe dental appointment in three quick steps — choose a service, pick a time, and enter your details.",
};

interface BookPageProps {
  searchParams: { service?: string };
}

export default function BookPage({ searchParams }: BookPageProps) {
  return (
    <main>
      <section className="section-pad pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Book Your <span className="text-teal">Appointment</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Three quick steps and you&apos;re booked. We&apos;ll match you with the right
              specialist and show their available times.
            </p>
          </div>
          <div className="mt-10 min-w-0">
            <BookingForm initialService={searchParams.service} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
