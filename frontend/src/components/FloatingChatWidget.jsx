import { useState, useRef, useEffect } from "react";
const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function FloatingChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! I can help with booking, availability, and rescheduling." },
    ]);
    const bottomRef = useRef(null);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

    async function sendMessage(e) {
        e?.preventDefault();
        const text = input.trim();
        if (!text) return;

        setMessages(m => [...m, { from: "user", text }]);
        setInput("");
        setLoading(true);

        try {
            // 🔑 1. Get token from localStorage
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE}/api/chat/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token ? token : "",   // 🔑 send token in `token` header (same as rest of app)
                },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            setMessages(m => [...m, { from: "bot", text: data?.reply || "Sorry, I couldn't reply." }]);
        } catch {
            setMessages(m => [...m, { from: "bot", text: "Network error. Try again." }]);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <button onClick={() => setOpen(v => !v)}
                className="fixed bottom-6 right-6 z-50 rounded-full shadow px-4 py-3 bg-blue-600 text-white">
                {open ? "×" : "Chat"}
            </button>

            {open && (
                <div className="fixed bottom-20 right-6 z-50 w-80 max-h-[70vh] bg-white border rounded-2xl shadow-xl flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b font-semibold">Clinic Assistant</div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`px-3 py-2 rounded-2xl max-w-[85%] whitespace-pre-wrap
                 ${m.from === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-900 rounded-bl-sm"}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-sm text-gray-500 italic">Assistant is typing…</div>}
                        <div ref={bottomRef} />
                    </div>
                    <form onSubmit={sendMessage} className="border-t p-2 flex gap-2">
                        <input className="flex-1 border rounded-xl px-3 py-2" placeholder="Type your question…"
                            value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-xl" disabled={loading}>Send</button>
                    </form>
                </div>
            )}
        </>
    );
}
