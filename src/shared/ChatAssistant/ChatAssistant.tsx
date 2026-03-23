import React, { useEffect, useState } from "react";
import styles from "./ChatAssistant.module.css";
import emailjs from "@emailjs/browser";
import softkodeLogo from "../../shared/image/positive.png";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ACCOUNT_EMAIL = process.env.REACT_APP_CONTACT_TO_EMAIL || "";

type ChatMessage = {
  id: number;
  from: "assistant" | "user";
  text: string;
};

const ChatAssistant: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
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

  const addChatMessage = (from: "assistant" | "user", text: string) => {
    setChatMessages((prev) => [...prev, { id: prev.length + 1, from, text }]);
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
        className={styles.chatLauncher}
        type="button"
        onClick={() => setChatOpen((s) => !s)}
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
