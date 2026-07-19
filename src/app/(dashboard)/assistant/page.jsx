"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/page-header";
import {
  createConversation,
  listConversations,
  listMessages,
  sendMessage,
} from "@/services/conversation-service";
import { getAIStatus } from "@/services/system-service";

const getProviderLabel = (status) => {
  if (!status?.enabled) return "AI disabled";
  if (status.provider === "auto") return "Ollama → Gemini fallback";
  if (status.provider === "ollama") {
    return `Local Ollama · ${status.ollama?.model || "model"}`;
  }
  if (status.provider === "gemini") {
    return `Gemini · ${status.gemini?.model || "model"}`;
  }
  return "AI provider";
};

export default function AssistantPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [providerStatus, setProviderStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const providerLabel = useMemo(
    () => getProviderLabel(providerStatus),
    [providerStatus]
  );

  const loadConversations = async () => {
    const items = await listConversations();
    setConversations(items);
    setActiveConversationId((current) => current || items[0]?._id || "");
  };

  const loadMessages = async (conversationId) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setMessages(await listMessages(conversationId));
  };

  useEffect(() => {
    loadConversations().catch((error) => setStatusMessage(error.message));
    getAIStatus()
      .then(setProviderStatus)
      .catch(() => setProviderStatus(null));
  }, []);

  useEffect(() => {
    loadMessages(activeConversationId).catch((error) =>
      setStatusMessage(error.message)
    );
  }, [activeConversationId]);

  const handleNewConversation = async () => {
    try {
      const conversation = await createConversation();
      setActiveConversationId(conversation._id);
      setMessages([]);
      await loadConversations();
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  const handleSend = async (event) => {
    event.preventDefault();
    const message = text.trim();

    if (!message || isSending) return;

    setIsSending(true);
    setStatusMessage("Thinking...");

    try {
      let conversationId = activeConversationId;

      if (!conversationId) {
        const conversation = await createConversation();
        conversationId = conversation._id;
        setActiveConversationId(conversationId);
      }

      await sendMessage(conversationId, message);
      setText("");
      await Promise.all([
        loadMessages(conversationId),
        loadConversations(),
      ]);
      setStatusMessage("");
    } catch (error) {
      setStatusMessage(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Assistant"
        title="GrantPilot Assistant"
        description="Application guidance powered by a free local Ollama model or optional Gemini free tier."
        action={
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
            {providerLabel}
          </span>
        }
      />

      <div className="card grid min-h-[650px] overflow-hidden lg:grid-cols-[260px_1fr]">
        <aside className="border-r bg-slate-50 p-4">
          <button
            type="button"
            onClick={handleNewConversation}
            className="w-full rounded-xl bg-indigo-600 p-3 font-bold text-white"
          >
            New conversation
          </button>

          <div className="mt-4 grid gap-2">
            {conversations.map((conversation) => (
              <button
                type="button"
                key={conversation._id}
                onClick={() => setActiveConversationId(conversation._id)}
                className={`rounded-xl p-3 text-left text-sm ${
                  activeConversationId === conversation._id
                    ? "bg-indigo-100"
                    : "hover:bg-slate-100"
                }`}
              >
                {conversation.title}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex flex-col">
          <div className="flex-1 space-y-4 overflow-auto p-5">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-dashed p-6 text-sm leading-7 text-slate-500">
                Ask about eligibility, statement-of-purpose planning, document
                preparation or your next application task.
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message._id}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl p-4 text-sm leading-7 ${
                  message.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {message.content}
              </div>
            ))}

            {statusMessage && (
              <p className="text-sm text-slate-600">{statusMessage}</p>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-3 border-t p-4">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              required
              disabled={isSending || providerStatus?.enabled === false}
              placeholder="Ask about your application..."
              className="flex-1 rounded-xl border p-3 disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={isSending || providerStatus?.enabled === false}
              className="rounded-xl bg-indigo-600 px-6 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
