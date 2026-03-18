import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JuneScheduleModal from "./JuneScheduleModal";
import { useUpcomingSessions } from '@/hooks/useUpcomingSessions';
import { trackFAQClick } from '@/utils/analytics';
import { formatSessionDateTime } from '@/utils/sessionDate';

const faqs = [
  {
    question: "What's the difference between your Progressive Course and this new membership?",
    answer:
      "The Progressive Course is an intensive, small-group program (8-14 students) focused exclusively on mental mediumship development. It includes longer sessions, one-on-one mentorship, personalized feedback on recordings, and deep, structured learning. This yearly and monthly subscription is a broader exploration of various spiritual practices including mediumship, trance, healing, tarot, and more in shorter 60-minute group sessions. The Progressive Course offers specialized depth and personal attention, while this membership provides general spiritual exploration at an introductory level with a larger student community and no group size limitations.",
  },
  {
    question: "What is included in the membership?",
    answer:
      "The membership includes 3 live interactive sessions per month, access to all session recordings, a supportive community forum, and direct access to Mia during Q&A portions. Yearly members also receive priority during Q&A sessions and a 10% discount on select offerings including personal sessions, soul portraits, and selected online workshops and programs.",
  },
  {
    question: "How do I claim my 10% discount on Mia's online offerings?",
    answer: (
      <div>
        <p className="mb-2">
          <strong>This discount is exclusively for yearly Journey with Mia members.</strong>
        </p>
        <p className="mb-3">
          <strong>Your 10% discount applies to:</strong>
        </p>
        <ul className="list-disc ml-6 mb-3 space-y-1">
          <li>Personal sessions</li>
          <li>Soul portraits</li>
          <li>Selected online workshops and programs</li>
        </ul>
        <p className="mb-3 text-sm text-gray-600">
          <em>Please note: Not all online workshops and programs are eligible for the discount - this will be clearly marked on each offering.</em>
        </p>
        <p className="mb-2">
          <strong>To claim your discount:</strong> You must reach out to Mia directly <strong>BEFORE</strong> making your purchase:
        </p>
        <ul className="list-disc ml-6 mb-3 space-y-1">
          <li>
            Email:{" "}
            <a
              href="mailto:mia@miaottosson.se"
              className="text-purple-700 underline hover:text-purple-900"
            >
              mia@miaottosson.se
            </a>
          </li>
          <li>Or contact via chat on the website</li>
        </ul>
        <p className="mb-2">
          <strong className="text-red-600">Important:</strong> Discounts cannot be applied retroactively. You must contact Mia before purchasing to receive your personalized discount code.
        </p>
      </div>
    ),
  },
  {
    question: "What if I can't attend the live sessions?",
    answer:
      "All sessions are recorded and made available to members within 72 hours. You can watch them at your convenience and still participate in the exercises on your own time. Many members achieve great results through the recordings alone.",
  },
  {
    question: "What is the class schedule and how long are the sessions?",
    answer: (
      <div>
        <div>
          <h4 className="font-medium text-purple-primary mb-2">March 2026:</h4>
          <ul className="list-disc ml-6 mb-3">
            <li>Monday, 9th March — 6:30pm to 8:00pm Sweden time<br className="sm:hidden" /><span className="text-amber-600 font-medium"> ⭐ Guest Teacher: Anneke</span></li>
            <li>Tuesday, 17th March — 6:30pm to 8:00pm Sweden time</li>
            <li>Tuesday, 31st March — 6:30pm to 8:00pm Sweden time</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-purple-primary mb-2">April 2026:</h4>
          <ul className="list-disc ml-6 mb-3">
            <li>Tuesday, 7th April — 6:30pm to 8:00pm Sweden time</li>
            <li>Tuesday, 14th April — 6:30pm to 8:00pm Sweden time<br className="sm:hidden" /><span className="text-amber-600 font-medium"> ⭐ Guest Teacher: Fredrik Haglund</span></li>
            <li>Tuesday, 28th April — 6:30pm to 8:00pm Sweden time</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-purple-primary mb-2">May 2026:</h4>
          <ul className="list-disc ml-6 mb-3">
            <li>Tuesday, 5th May — 6:30pm to 8:00pm Sweden time</li>
            <li>Thursday, 14th May — 6:30pm to 8:00pm Sweden time<br className="sm:hidden" /><span className="text-amber-600 font-medium"> ⭐ Guest Teacher: Elinor Hedlund</span></li>
            <li>Tuesday, 19th May — 6:30pm to 8:00pm Sweden time</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-purple-primary mb-2">June 2026:</h4>
          <ul className="list-disc ml-6 mb-3">
            <li>Thursday, 4th June — 6:30pm to 8:00pm Sweden time<br className="sm:hidden" /><span className="text-amber-600 font-medium"> ⭐ Guest Teacher: Eva Schartner</span></li>
            <li>Tuesday, 16th June — 6:30pm to 8:00pm Sweden time</li>
            <li>Tuesday, 23rd June — 6:30pm to 8:00pm Sweden time</li>
          </ul>
        </div>
        <p className="mt-2">
          <strong>Each class lasts 60 to 90 minutes.</strong>
        </p>
        <p className="mt-2 text-sm">
          <span className="font-semibold text-yellow-800">Check your local time zone:&nbsp;</span>
          <a
            href="https://dateful.com/time-zone-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 underline hover:text-purple-900"
          >
            dateful.com/time-zone-converter
          </a>
        </p>
        <p className="mt-2 text-xs text-gray-500 italic">
          <span className="text-red-700 font-medium">Important:</span> All dates are subject to change with advance notice.
        </p>
      </div>
    ),
  },
  {
    question: "Are the class days the same every month?",
    answer: (
      <div>
        <p>
          To ensure the long-term sustainability of the community and to allow Mia to bring her fullest, most present energy to each session, the specific days of the week for our three live sessions may change from month to month.
        </p>
        <p className="mt-2">
          This flexibility is what makes it possible for us to offer this deep level of guidance and community at such an accessible price point.
        </p>
        <p className="mt-2">
          We are committed to providing the schedule at least one to two months in advance so you have ample time to plan. And remember, all sessions are recorded and uploaded to the member portal within 72 hours, so you will never miss a lesson.
        </p>
        <p className="mt-2">
          For those who require a fixed, long-term schedule, we recommend exploring Mia's{" "}
          <a
            href="https://progressivemediumship.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 underline hover:text-purple-900"
          >
            Progressive Mediumship Course
          </a>
          , which has set dates and times established for the entire 8-month journey.
        </p>
      </div>
    ),
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Due to the exceptional quality of Mia's work and the already low membership fee, there are no refunds for any membership. However, you can always start with a monthly subscription and simply cancel the renewal at any time with no questions asked. You're encouraged to experience a session first before upgrading to yearly for maximum value.",
  },
  {
    question: "What topics will be covered?",
    answer:
      "The curriculum covers a wide range of mediumship development topics including strengthening your intuition, recognizing spiritual energies, ethical practices, evidence-based communication, healing through mediumship, and developing your unique spiritual talents.",
  },
  {
    question: "What if I'm not good enough or too much of a beginner?",
    answer:
      "That's exactly what 90% of our members thought before joining. The truth? Beginners often progress fastest because they haven't learned bad habits to unlearn. Mia meets you exactly where you are—no judgment, no pressure, just gentle guidance at your own pace.",
  },
  {
    question: "What if this is just like every other course I've tried?",
    answer:
      "If other courses made you follow THEIR method, this will feel different. Mia's approach is helping you discover YOUR way—the way Spirit already wants to work with you. That's why members stay for years, not weeks. You're not learning a system; you're uncovering what's already natural to you.",
  },
  {
    question: "How is this different from free YouTube content?",
    answer:
      "YouTube can teach you techniques. But it can't tell you 'that thing you just felt? That was real.' It can't give you a safe space to practice with real people. And it can't give you a mentor who's guided 5,000+ people through exactly what you're experiencing. The community and personal feedback make all the difference.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Absolutely! The membership is designed for all levels, from complete beginners to those with some experience. Mia provides clear guidance and exercises appropriate for wherever you are on your journey. Many beginners have found this to be the perfect starting point.",
  },
  {
    question: "How can I receive personalized feedback from Mia on my practice?",
    answer:
      "Mia provides personalized feedback during the live group sessions immediately following practice exercises. After you complete your practice work with a partner, Mia offers individualized guidance and constructive feedback to help you refine your abilities. This real-time feedback approach ensures you receive immediate support while maintaining the intimate, supportive atmosphere of our community sessions.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, monthly memberships can be canceled at any time. For yearly memberships, you receive the full year's access upfront at the discounted rate, so they are non-refundable but will not auto-renew unless you choose to continue.",
  },
  {
    question: "Will I get the same membership price if I cancel and rejoin later?",
    answer:
      "Your membership fee is locked in for as long as you remain an active member. If you choose to cancel and later decide to rejoin, you'll be considered a new member and will pay the current listed price at that time. However, continuous members enjoy price protection - even if our rates increase over time, your original pricing remains the same. This is one of the many benefits of maintaining your membership journey with us.",
  },
  {
    question: "Why should I choose the yearly option?",
    answer:
      "The yearly membership offers tremendous value with a 42% discount compared to paying monthly, and includes exclusive bonuses such as the 'Secrets to Mediumship Masterclass' (60-min recording). Yearly members receive priority during Q&A sessions, a 10% discount on Mia's online offerings (personal sessions, soul portraits, and selected programs - contact required to claim), and lock in the current pricing for the entire year.",
  },
];

const FaqSection = () => {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const { data: upcomingSessions = [] } = useUpcomingSessions();
  const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null;

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gray-50 section-padding" id="faq">
      <JuneScheduleModal open={scheduleOpen} onOpenChange={setScheduleOpen} />
      <div className="container mx-auto px-5 sm:px-6">
        <div className="text-center mb-8">
          <span className="inline-block bg-purple-50 text-purple-primary px-4 py-1 rounded-full text-xs sm:text-sm mb-3">
            Questions & Answers
          </span>

          {/* Schedule notice */}
          <div className="mb-5">
            <div className="inline-block bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium">
              Next class starts{" "}
              <span className="font-bold">
                {nextSession ? formatSessionDateTime(nextSession.date, nextSession.time) : 'TBD'} Sweden time
              </span>
              <br />
              All classes last <span className="font-bold">60 to 90 minutes.</span>
              <span
                className="ml-1 text-xs text-amber-600 underline cursor-pointer hover:text-purple-700 transition-colors"
                onClick={() => setScheduleOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === "Enter" || e.key === " ") && setScheduleOpen(true)}
                aria-label="See full schedule"
              >
                (see full schedule)
              </span>
            </div>
          </div>

          <h2 className="font-serif text-purple-primary text-2xl sm:text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="bg-white rounded-lg shadow-sm border-none">
                <AccordionTrigger
                  className="px-5 py-4 text-left font-medium text-purple-primary text-sm sm:text-base"
                  onClick={() => trackFAQClick(faq.question)}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-gray-600 text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-gray-500 mb-4 text-sm">
              Still have questions?{" "}
              <a
                href="mailto:mia@miaottosson.se"
                className="underline hover:text-purple-700 transition-colors"
              >
                We're here to help.
              </a>
            </p>
            <button onClick={scrollToPricing} className="primary-button text-sm">
              Yes, I'm Ready to Trust My Talents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
