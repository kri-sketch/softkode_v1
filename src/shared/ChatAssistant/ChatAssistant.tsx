import React, { useCallback, useEffect, useState } from "react";
import styles from "./ChatAssistant.module.css";
import emailjs from "@emailjs/browser";
import softkodeLogo from "../../shared/image/softkode_icon_transparent.png";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ACCOUNT_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

type ChatMessage = {
  id: number;
  from: "assistant" | "user";
  text: string;
};

const techMotivation = [
  "Performance is a feature, not just an afterthought.",
  "Every line of code is an opportunity to build something meaningful.",
  "Optimized cloud architecture frees time to innovate, not just iterate.",
  "In software, the best UI is the one that makes users' work invisible.",
  "Resilience in code comes from anticipating edge cases before they happen.",
  "Did you know Facebook built React to solve exponential UI complexity?",
  "Modern SaaS platforms live and die by their onboarding friction.",
  "Great engineering scales the business, not just the servers.",
  "Linux started as a personal project and now runs the global cloud ecosystem.",
  "A milliseconds drop in latency can dramatically increase user conversion.",
  "Simplicity is the soul of software efficiency.",
  "Code debt is like financial debt—if you don't pay it, it compounds.",
  "Next-generation applications don't just process data; they predict it.",
  "Building for accessibility means building a better product for everyone.",
  "The best error message is the one that never needs to be shown.",
  "Scalability isn't about handling success tomorrow; it's about not breaking today.",
  "Test-driven development is an investment in your future sanity.",
  "The cloud is just somebody else's computer, but making it dance is an art.",
  "Good design is obvious. Great design is completely transparent.",
  "SoftKode focuses on building foundations that empower your future growth."
];

const ChatAssistant: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [borderActive, setBorderActive] = useState(false);
  const [showTipBanner, setShowTipBanner] = useState(false);
  const [latestTip, setLatestTip] = useState<string>(
    "Softkode Assistant is ready with a new tech insight!",
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: "assistant",
      text: "Welcome to Softkode Assistant! I’m your in-app helper across the site.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStep, setChatStep] = useState<
    "greeting" | "collect" | "submitted"
  >("greeting");
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatContact, setChatContact] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [chatStatus, setChatStatus] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  const addChatMessage = useCallback(
    (from: "assistant" | "user", text: string) => {
      setChatMessages((prev) => {
        if (
          from === "assistant" &&
          prev.length > 0 &&
          prev[prev.length - 1].text === text
        ) {
          return prev;
        }

        const next = [...prev, { id: prev.length + 1, from, text }];
        return next.slice(-10); // keep last 10 messages
      });

      if (from === "assistant") {
        setLatestTip(text);
      }
    },
    [],
  );

  useEffect(() => {
    if (!chatOpen) return;

    // immediate first tip on open
    addChatMessage(
      "assistant",
      techMotivation[Math.floor(Math.random() * techMotivation.length)],
    );

    const interval = setInterval(() => {
      addChatMessage(
        "assistant",
        techMotivation[Math.floor(Math.random() * techMotivation.length)],
      );
    }, 45000);

    return () => clearInterval(interval);
  }, [chatOpen, addChatMessage]);

  useEffect(() => {
    const pickTip = () => {
      const tip =
        techMotivation[Math.floor(Math.random() * techMotivation.length)];
      setLatestTip(tip);
      setShowTipBanner(true);
      setBorderActive(true);
      const timeout = window.setTimeout(() => {
        setShowTipBanner(false);
        setBorderActive(false);
      }, 4000);
      return timeout;
    };

    let hideTimeout = pickTip();
    const interval = window.setInterval(() => {
      clearTimeout(hideTimeout);
      hideTimeout = pickTip();
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, []);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        console.warn("emailjs.init failed in ChatAssistant:", err);
      }
    }
  }, []);

  const sendEmail = async (payload: {
    name: string;
    email: string;
    contact: string;
    message: string;
  }) => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      throw new Error("Email service is not configured.");
    }

    const templateParams = {
      ...payload,
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      to_email: ACCOUNT_EMAIL,
    };

    try {
      emailjs.init(PUBLIC_KEY);
    } catch {
      // ignore if already inited
    }

    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  };

  const handleChatInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    addChatMessage("user", trimmed);
    setChatInput("");

    if (chatStep === "greeting") {
      setChatStep("collect");
      addChatMessage(
        "assistant",
        "Awesome! Please enter your details and message below.",
      );
    }
  };

  const handleChatFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChatSending(true);
    setChatStatus(null);

    if (!chatName || !chatEmail || !chatMessage) {
      setChatStatus({
        type: "error",
        text: "Name, email and message are required.",
      });
      setChatSending(false);
      return;
    }

    const payload = {
      name: chatName,
      email: chatEmail,
      contact: chatContact,
      message: chatMessage,
    };

    try {
      await sendEmail(payload);
      setChatStatus({
        type: "success",
        text: "Your request was sent successfully.",
      });
      setChatStep("submitted");
      addChatMessage(
        "assistant",
        "Your details are saved and sent. Thanks! 💬",
      );
      localStorage.setItem("chatRequest", JSON.stringify(payload));
      setChatName("");
      setChatEmail("");
      setChatContact("");
      setChatMessage("");
    } catch (err: any) {
      const text = err && (err.text || err.message || JSON.stringify(err));
      setChatStatus({
        type: "error",
        text: text || "Email sending failed in chat.",
      });
    } finally {
      setChatSending(false);
    }
  };

  return (
    <>
      <button
        className={`${styles.chatLauncher} ${borderActive ? styles.chatLauncherActive : ""}`}
        type="button"
        onClick={() =>
          setChatOpen((s) => {
            const next = !s;
            if (next) {
              setBorderActive(false);
              setShowTipBanner(false);
            }
            return next;
          })
        }
        aria-label="Open Softkode chat assistant"
      >
        <img
          src={softkodeLogo}
          alt="Chat with Softkode"
          className={styles.chatLauncherIcon}
          loading="lazy"
          decoding="async"
        />
      </button>

      {!chatOpen && showTipBanner && (
        <div className={styles.tipBanner} role="status" aria-live="polite">
          <span>💡 Softkode Tip:</span>
          <strong>{latestTip}</strong>
          <button
            type="button"
            className={styles.openChatFromTip}
            onClick={() => {
              setChatOpen(true);
              setShowTipBanner(false);
            }}
          >
            Open Chat
          </button>
        </div>
      )}

      {chatOpen && (
        <div
          className={styles.chatWidget}
          role="region"
          aria-label="Softkode assistant chat"
        >
          <div className={styles.chatHeader}>
            <div>
              <h3>Softkode Chat Assistant</h3>
              <p className={styles.chatTagline}>
                Your in-app support for any page.
              </p>
              <p className={styles.proTipLabel}>
                Pro Tip: Check these quick tech insights every 15s.
              </p>
            </div>
            <button
              className={styles.chatCloseButton}
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
            >
              <span className={styles.chatCloseIcon}>X</span>
            </button>
          </div>

          <div className={styles.chatBody}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.from === "assistant"
                    ? styles.chatAssistant
                    : styles.chatUser
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          {chatStep === "collect" && (
            <form className={styles.chatForm} onSubmit={handleChatFormSubmit}>
              <input
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                value={chatEmail}
                onChange={(e) => setChatEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
              />
              <input
                value={chatContact}
                onChange={(e) => setChatContact(e.target.value)}
                placeholder="Contact"
              />
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Your message"
                required
              />
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={chatSending}
              >
                {chatSending ? "Sending..." : "Send"}
              </button>
              {chatStatus && (
                <div
                  className={
                    chatStatus.type === "success"
                      ? styles.successMessage
                      : styles.errorMessage
                  }
                >
                  {chatStatus.text}
                </div>
              )}
            </form>
          )}

          {chatStep === "greeting" && (
            <form
              className={styles.chatInputForm}
              onSubmit={handleChatInputSubmit}
            >
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tell me how I can help"
              />
              <button type="submit" className={styles.primaryButton}>
                Send
              </button>
            </form>
          )}

          {chatStep === "submitted" && (
            <div className={styles.chatInfoText}>
              Thanks! Close this chat or ask another question.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
