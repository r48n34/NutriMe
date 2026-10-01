import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MessageCircleHeart,
  Send,
  Sparkles,
} from "lucide-react";
import { useDemo } from "../state/DemoContext";
import { useToast } from "../state/ToastContext";
import { PageTitle, Modal } from "../components/UI";
import { Mascot } from "../components/Mascot";
import { coachResponse } from "../utils/coach";
import { formatDate, shiftDate } from "../utils/dates";

export function Coach() {
  const { state, dispatch, today } = useDemo();
  const toast = useToast();
  const [input, setInput] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(shiftDate(today, 1));
  const [time, setTime] = useState("12:30");
  const messageList = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = messageList.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [state.messages.length]);
  const send = (text: string) => {
    if (!text.trim()) return;
    const response = coachResponse(text, state, today);
    if (response.action) dispatch(response.action);
    dispatch({
      type: "MESSAGE",
      messages: [
        { id: crypto.randomUUID(), role: "user", text: text.trim() },
        { id: crypto.randomUUID(), role: "coach", text: response.text },
      ],
    });
    setInput("");
  };
  const duplicate = state.bookings.some(
    (booking) => booking.date === bookingDate && booking.time === time,
  );
  return (
    <>
      <PageTitle
        title="A little support, a big difference."
        description="A gentle nudge. A fresh perspective. Someone in your corner."
      />
      <div className="coach-layout">
        <section className="card chat-card">
          <div className="chat-heading">
            <span className="coach-avatar">
              <MessageCircleHeart size={24} />
            </span>
            <div>
              <h2>Your everyday companion</h2>
              <span>
                <i />
                Practice a conversation · Scripted demo
              </span>
            </div>
            <Sparkles size={19} />
          </div>
          <div
            className="messages"
            ref={messageList}
            role="log"
            aria-live="polite"
            aria-label="Demo coaching conversation"
          >
            {state.messages.map((message) => (
              <div className={`message ${message.role}`} key={message.id}>
                {message.role === "coach" && <span className="message-avatar">M</span>}
                <div>
                  <span>
                    {message.role === "coach"
                      ? "ME · YOUR DEMO COACH"
                      : state.profile.name.toUpperCase()}
                  </span>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-prompts">
            <span className="eyebrow">A LITTLE HELP WITH…</span>
            <div>
              {[
                "I only have 10 minutes.",
                "I’d like a different lunch.",
                "How am I doing?",
                "Help me wind down.",
              ].map((prompt) => (
                <button key={prompt} onClick={() => send(prompt)}>
                  {prompt}
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>
          <form
            className="chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <label className="sr-only" htmlFor="coach-input">
              Message the demo coach
            </label>
            <input
              id="coach-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="What’s on your mind?"
              maxLength={500}
            />
            <button
              className="icon-button"
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={19} />
            </button>
          </form>
          <p className="chat-fine-print">
            Replies are scripted locally. This demo doesn’t connect to an AI or a health
            professional.
          </p>
        </section>
        <aside className="coaching-aside">
          <section className="expert-card">
            <div className="expert-art">
              <span className="expert-ring" />
              <div className="expert-portrait">
                <svg
                  viewBox="0 0 180 185"
                  role="img"
                  aria-label="Illustration of fictional coach Jamie"
                >
                  <path d="M20 185c0-52 25-70 70-70s70 25 70 70" fill="#fff9ed" />
                  <path
                    d="M90 138c-37 0-53-34-47-69 1-28 19-47 47-47 35 0 54 22 49 61-4 30-18 55-49 55Z"
                    fill="#335448"
                  />
                  <ellipse cx="90" cy="81" rx="34" ry="44" fill="#e9c5a3" />
                  <path
                    d="M54 79c-4-36 10-59 42-53 25 5 33 23 30 41-29 0-42-14-47-25-3 17-12 30-25 37Z"
                    fill="#335448"
                  />
                  <path
                    d="M77 101q14 14 27-1"
                    stroke="#815646"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="75" cy="81" r="2.5" fill="#3d4a38" />
                  <circle cx="106" cy="81" r="2.5" fill="#3d4a38" />
                  <path
                    d="m60 131 30 33 29-33m-29 33v22"
                    stroke="#cdded0"
                    fill="none"
                    strokeWidth="3"
                  />
                  <path d="M82 122v15l8 10 9-10v-14" fill="#e9c5a3" />
                </svg>
              </div>
              <span className="expert-badge">
                <Check size={13} />
                Fictional demo coach
              </span>
            </div>
            <div className="expert-content">
              <div className="eyebrow">A HUMAN TOUCH</div>
              <h2>Meet Jamie.</h2>
              <p>Explore what a supportive, one-to-one wellness conversation could look like.</p>
              <div className="expert-meta">
                <span>
                  <Clock3 size={15} />
                  30-minute sample session
                </span>
                <span>
                  <CalendarDays size={15} />
                  Online · Hong Kong time
                </span>
              </div>
              <button className="button button-full" onClick={() => setBookingOpen(true)}>
                Try booking a session
                <ArrowRight size={16} />
              </button>
              <small>Simulated booking · No real appointment</small>
            </div>
          </section>
          <div className="coach-small-note">
            <Mascot pose="rest" />
            <p>
              You don’t have to figure
              <br />
              everything out at once.
              <br />
              <strong>One little step is enough.</strong>
            </p>
          </div>
        </aside>
      </div>
      {bookingOpen && (
        <Modal title="Make a little time for you." onClose={() => setBookingOpen(false)}>
          <p className="detail-description">
            Try a sample 30-minute session with Jamie. Choose a day and time to see how booking
            works.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              dispatch({
                type: "BOOK",
                booking: { id: crypto.randomUUID(), date: bookingDate, time, coach: "Jamie" },
              });
              toast("Your demo session is booked. Find it in your profile.");
              setBookingOpen(false);
            }}
          >
            <fieldset className="choice-group">
              <legend>Choose your day</legend>
              <div className="booking-days">
                {[1, 2, 3].map((offset) => {
                  const date = shiftDate(today, offset);
                  return (
                    <label key={date} className={bookingDate === date ? "selected" : ""}>
                      <input
                        type="radio"
                        name="booking-date"
                        checked={bookingDate === date}
                        onChange={() => setBookingDate(date)}
                      />
                      <span>{formatDate(date, { weekday: "short" })}</span>
                      <strong>{formatDate(date, { day: "numeric", month: "short" })}</strong>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <fieldset className="choice-group">
              <legend>A time that works for you</legend>
              <div className="booking-times">
                {["09:00", "12:30", "18:00"].map((slot) => (
                  <label key={slot} className={time === slot ? "selected" : ""}>
                    <input
                      type="radio"
                      name="booking-time"
                      checked={time === slot}
                      onChange={() => setTime(slot)}
                    />
                    {slot}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="fine-print">
              All times are in Hong Kong time. This creates a demo booking only.
            </p>
            <button className="button button-full" type="submit" disabled={duplicate}>
              {duplicate ? "You’ve already booked this slot" : "Confirm demo booking"}
              <ArrowRight size={16} />
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
