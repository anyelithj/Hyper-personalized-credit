'use client';

import { useState, useRef, useEffect } from 'react';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Close from '@mui/icons-material/Close';
import Send from '@mui/icons-material/Send';
import { SEED_AFFILIATES, CHANNEL_RULES_SEED } from '@/lib/constants';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'offer';
  text: string;
  offerData?: {
    producto: string;
    monto: number;
    canal: string;
  };
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && !hasOpened) {
      setHasOpened(true);
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'Hola 👋 Soy el bot de canales. Analizo tus señales de comportamiento para elegir por dónde y cuándo entregarte tu oferta.',
        },
        {
          id: '2',
          sender: 'bot',
          text: 'Escribe una cédula registrada (ej. 1015432198) y te muestro el resultado del algoritmo de selección.',
        },
      ]);
    }
  };

  const processCedula = (cedula: string) => {
    if (!cedula.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: cedula,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const match =
        SEED_AFFILIATES.find((a) => a.cedula === cedula) ||
        SEED_AFFILIATES[Math.abs(hashCode(cedula)) % SEED_AFFILIATES.length];
      
      const rule = CHANNEL_RULES_SEED.find((r) => r.canal === match.canal);

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + '1',
          sender: 'bot',
          text: `Perfil detectado: <b>${match.nombre}</b> · Categoría ${match.categoria}.<br/>Señales consideradas: ${match.senales.map((s) => s.n.toLowerCase()).join('; ')}.`,
        },
      ]);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + '2',
            sender: 'bot',
            text: `Aplicando reglas del bot → canal seleccionado: <b>${match.canal}</b>. ${rule ? `Coincide con la regla: "${rule.condicion}" (ventana ${rule.horario}).` : ''}`,
          },
        ]);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + '3',
              sender: 'offer',
              text: `<b>${match.oferta}</b><br/>Monto sugerido: $${match.monto.toLocaleString('es-CO')}<br/>Se despachará por <b>${match.canal}</b>.`,
            },
          ]);
        }, 600);
      }, 600);
    }, 700);
  };

  function hashCode(str: string) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return h;
  }

  return (
    <>
      {/* Floating Fab */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Abrir bot de canales"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--blue)] text-white shadow-xl hover:bg-[var(--blue-hover)] transition-all hover:scale-105"
      >
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--teal)]" />
        <ChatBubbleOutline />
      </button>

      {/* Floating Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex h-[480px] max-h-[calc(100vh-140px)] w-[352px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl bg-[var(--ink)] text-white shadow-2xl transition-all duration-200 ${
          isOpen
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Panel Head */}
        <div className="flex items-center justify-between border-b border-[#24314F] p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gold)] font-bold text-[var(--ink)] text-sm">
              ◈
            </div>
            <div>
              <b className="block text-xs font-semibold text-white">Bot de canales</b>
              <span className="text-[11px] text-[#8891A6]">Selecciona tu canal y tu oferta en vivo</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar chat"
            className="text-[#8891A6] hover:text-white"
          >
            <Close fontSize="small" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12.8px] leading-relaxed animate-chip-in ${
                m.sender === 'user'
                  ? 'ml-auto bg-[var(--teal)] text-white rounded-br-none'
                  : m.sender === 'offer'
                  ? 'w-full max-w-full bg-[#1D2841] border border-dashed border-[#3A4666] text-[#EAEFF7]'
                  : 'bg-[#1D2841] text-[#EAEFF7] rounded-bl-none'
              }`}
              dangerouslySetInnerHTML={{ __html: m.text }}
            />
          ))}

          {isTyping && (
            <div className="flex items-center gap-1 px-3 py-2 text-[#5C6A8C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5C6A8C] animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#5C6A8C] animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#5C6A8C] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick buttons */}
        <div className="flex gap-2 flex-wrap px-4 pb-2">
          {SEED_AFFILIATES.slice(0, 3).map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => processCedula(a.cedula)}
              className="rounded-full border border-[#2C3855] bg-[#1D2841] px-2.5 py-1 text-[11px] text-[#CBD3E3] hover:border-[var(--teal)] hover:text-white transition-colors"
            >
              {a.nombre.split(' ')[0]} · {a.cedula}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            processCedula(inputVal);
          }}
          className="flex gap-2 border-t border-[#24314F] p-3"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Escribe tu cédula, ej. 1015432198"
            className="flex-1 rounded-lg border border-[#2C3855] bg-[#1D2841] px-3 py-2 font-mono text-xs text-white placeholder-[#63708A] focus:border-[var(--teal)] focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-[var(--gold)] px-3 text-[var(--ink)] font-bold hover:brightness-110 transition-all"
          >
            <Send fontSize="small" />
          </button>
        </form>
      </div>
    </>
  );
}
