
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { CalendarClock, Star } from "lucide-react";

interface ScheduleBlock {
  month: string;
  sessions: {
    isoDate: string;
    date: string;
    time: string;
    hasGuest: boolean;
    guestName: string;
  }[];
}

interface JulyScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleByMonth?: ScheduleBlock[];
}

export default function JulyScheduleModal({ open, onOpenChange, scheduleByMonth = [] }: JulyScheduleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg rounded-2xl bg-white shadow-2xl border border-purple-light p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <CalendarClock className="text-purple-primary" size={26} />
            <DialogTitle className="text-lg sm:text-xl font-serif text-purple-primary">
              Full Class Schedule
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="mb-2 text-sm sm:text-base text-gray-700">
          <p>
            <span className="font-semibold">All classes:</span>{" "}
            <span className="text-purple-primary">6:30pm – 8:00pm Sweden time (CET/CEST)</span>
          </p>
          <div className="my-4 space-y-4 max-h-72 overflow-y-auto">
            {scheduleByMonth.length > 0 ? (
              scheduleByMonth.map(block => (
                <div key={block.month}>
                  <h4 className="font-medium text-purple-primary mb-2 text-sm">{block.month}:</h4>
                  <ul className="space-y-2 mb-3">
                    {block.sessions.map((s) => (
                      <li key={s.isoDate} className="flex items-start gap-2">
                        <span className={`h-3 w-3 rounded-full mt-2 flex-shrink-0 ${s.hasGuest ? 'bg-amber-500' : 'bg-purple-primary'}`} />
                        <div>
                          <span className="font-medium text-sm">{s.date}</span>
                          <div className="text-xs text-gray-600">{s.time}</div>
                          {s.hasGuest && s.guestName && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                              <span className="text-xs font-medium text-amber-700">Guest: {s.guestName}</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">Schedule data is loading...</p>
            )}
          </div>
          <p className="mb-2 text-xs sm:text-sm text-gray-700">
            <span className="font-semibold">Each class lasts 60 to 90 minutes.</span>
          </p>
          <p className="mb-2 text-xs sm:text-sm">
            <span className="font-semibold text-yellow-800">Check your local time zone: </span>
            <a
              href="https://dateful.com/time-zone-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-600"
            >
              dateful.com/time-zone-converter
            </a>
          </p>
          <div className="mt-3 text-xs sm:text-sm text-gray-500 italic">
            All dates are subject to change with advance notice.
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className="primary-button w-full sm:w-auto mt-2">Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
