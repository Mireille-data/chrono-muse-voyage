import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — 12 500 €
- Crétacé -65M (dinosaures, nature préhistorique, safari temporel) — 18 900 €
- Florence 1504 (Renaissance, art, Michel-Ange, Léonard de Vinci) — 14 200 €

Tu peux suggérer des destinations selon les intérêts du client. Réponds en français. Sois concis mais informatif.`;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! 🌟 Bienvenue chez TimeTravel Agency. Je suis votre guide temporel. Comment puis-je vous aider à planifier votre voyage dans le temps ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Try Lovable AI via edge function
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream error");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                )
              );
            }
          } catch {
            // partial JSON, skip
          }
        }
      }
    } catch {
      // Fallback: simple local response if no backend
      const fallback = getFallbackResponse(input.trim());
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-8 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] glass-card flex flex-col z-50 shadow-2xl"
          >
            <div className="gold-gradient-bg p-4 rounded-t-lg flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-primary-foreground text-lg">Guide Temporel</h3>
                <p className="text-primary-foreground/70 text-xs">En ligne • Prêt à vous aider</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "gold-gradient-bg text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none">
                        <ReactMarkdown>{msg.content || "..."}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-lg px-4 py-2 text-sm text-muted-foreground">
                    <span className="animate-pulse">●●●</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="p-3 border-t border-border/50 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions..."
                className="flex-1 bg-secondary text-foreground rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="gold-gradient-bg text-primary-foreground p-2 rounded-lg disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 md:right-8 z-50 gold-gradient-bg text-primary-foreground p-4 rounded-full shadow-lg animate-pulse-gold"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
};

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("paris") || lower.includes("1889") || lower.includes("eiffel"))
    return "🗼 **Paris 1889** est notre destination phare ! Vivez l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Dîners d'époque, promenades en calèche, et rencontres avec les impressionnistes. **À partir de 12 500 €.**";
  if (lower.includes("crétacé") || lower.includes("dinosaure") || lower.includes("cretace"))
    return "🦕 **Le Crétacé** est notre aventure la plus extrême ! Safari en capsule blindée, observation de T-Rex, et survol des plaines préhistoriques. Sécurité maximale garantie. **À partir de 18 900 €.**";
  if (lower.includes("florence") || lower.includes("1504") || lower.includes("renaissance") || lower.includes("michel"))
    return "🎨 **Florence 1504** vous plonge au cœur de la Renaissance ! Visitez l'atelier de Michel-Ange, assistez à un banquet chez les Médicis. Art, science et splendeur. **À partir de 14 200 €.**";
  if (lower.includes("prix") || lower.includes("coût") || lower.includes("combien") || lower.includes("tarif"))
    return "💰 Nos tarifs :\n- **Paris 1889** : à partir de 12 500 €\n- **Crétacé -65M** : à partir de 18 900 €\n- **Florence 1504** : à partir de 14 200 €\n\nChaque forfait inclut le transport temporel, l'hébergement d'époque et un guide historien dédié.";
  if (lower.includes("sécurité") || lower.includes("danger") || lower.includes("risque"))
    return "🛡️ Votre sécurité est notre priorité absolue. Nos portails quantiques ont un taux de retour de **99.9%**. Chaque voyageur est équipé d'un dispositif de rappel d'urgence et accompagné par un agent temporel certifié.";
  if (lower.includes("bonjour") || lower.includes("salut") || lower.includes("hello"))
    return "Bonjour ! 🌟 Ravi de vous accueillir chez TimeTravel Agency. Quelle époque vous tente ? Paris 1889, le Crétacé, ou Florence 1504 ?";
  return "Merci pour votre question ! 🕐 Je suis là pour vous aider à choisir la destination temporelle parfaite. Vous pouvez me demander des détails sur **Paris 1889**, le **Crétacé**, ou **Florence 1504**. Que souhaitez-vous explorer ?";
}

export default ChatWidget;
