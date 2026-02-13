
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Star, Laugh, Clock, X, 
  Mail, Sparkles, Gift, Users, Calendar, 
  Smile, Book, Zap, Sun
} from 'lucide-react';

// --- Constants ---
const LOVE_MESSAGES = [
  "You made my academy days happier",
  "I still smile remembering our jokes",
  "You were my comfort place",
  "You mattered more than I ever said",
  "I miss the normal us",
  "You were home to me",
  "Our friendship is a treasure",
  "I carry our memories everywhere",
  "You are irreplaceable",
  "I pray for our bond to heal"
];

const TIMELINE_EVENTS = [
  { year: "Day 1", event: "The 5 of us met. Nervous smiles and new beginnings.", icon: "✨" },
  { year: "Month 3", event: "First group dinner where we laughed until it hurt.", icon: "🍕" },
  { year: "Mid-Term", event: "Late night study sessions and too much coffee.", icon: "📚" },
  { year: "The Best Day", event: "That random trip where we promised to stay friends forever.", icon: "🌟" }
];

const INSIDE_JOKES = [
  { text: "That one nickname nobody else understands.", icon: <Smile className="text-[#FF8FAB]" /> },
  { text: "The emergency snacks during long lectures.", icon: <Zap className="text-[#E6D9FF]" /> },
  { text: "The silent conversations we had just by looking at each other.", icon: <Users className="text-[#FFD6E0]" /> },
  { text: "Our specific 'spot' in the academy garden.", icon: <Sun className="text-[#FFC2D1]" /> }
];

// --- Sub-Components ---

const GlobalParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles once on mount
    const p = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 15 + Math.random() * 25,
      type: Math.random() > 0.5 ? 'heart' : 'sparkle'
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 opacity-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [-100, -800],
            x: [0, Math.random() * 200 - 100]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: p.left, top: p.top }}
        >
          {p.type === 'heart' ? (
            <Heart className="text-[#FFD6E0] fill-[#FFD6E0]" style={{ width: p.size, height: p.size }} />
          ) : (
            <Sparkles className="text-[#E6D9FF]" style={{ width: p.size, height: p.size }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

const Confetti = ({ active }: { active: boolean }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[160] flex items-center justify-center">
      {Array.from({ length: 80 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 30 + Math.random() * 40;
        const xEnd = Math.cos(angle) * velocity;
        const yEnd = Math.sin(angle) * velocity;

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{ 
              x: `${xEnd}vw`, 
              y: `${yEnd}vh`, 
              opacity: [1, 1, 0], 
              scale: [0, Math.random() * 1.5 + 0.5, 0],
              rotate: Math.random() * 720
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-3 h-3 md:w-5 md:h-5 rounded-sm"
            style={{ 
              backgroundColor: ['#FFD6E0', '#E6D9FF', '#FF8FAB', '#FFC2D1'][i % 4],
              borderRadius: i % 3 === 0 ? '50%' : '4px'
            }}
          />
        );
      })}
    </div>
  );
};

const MemoryTimeline = () => (
  <div className="py-20 px-4 overflow-x-auto">
    <div className="flex min-w-[700px] justify-between relative mb-12 before:absolute before:top-1/2 before:left-0 before:w-full before:h-1 before:bg-[#FFD6E0]/40 before:-translate-y-1/2">
      {TIMELINE_EVENTS.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="relative flex flex-col items-center group cursor-help z-10"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#FFD6E0] group-hover:border-[#FF8FAB] transition-all mb-6">
            <span className="text-2xl">{item.icon}</span>
          </div>
          <p className="font-bold text-sm uppercase tracking-widest text-[#FF8FAB] mb-2">{item.year}</p>
          
          <div className="absolute top-20 scale-0 group-hover:scale-100 transition-transform duration-300 origin-top glass p-6 w-48 text-center z-20 pointer-events-none shadow-xl">
            <p className="text-base text-[#5A5A5A] italic leading-relaxed">{item.event}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const WelcomeModal = ({ onComplete }: { onComplete: (name: string) => void }) => {
  const [name, setName] = useState('');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-[#FFFAF5]/60 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass p-12 md:p-16 text-center max-w-md border-none shadow-2xl"
      >
        <Heart className="w-16 h-16 text-[#FF8FAB] fill-[#FF8FAB] mx-auto mb-8 animate-pulse" />
        <h2 className="text-4xl font-handwritten rose-text mb-6 font-bold">Hello, Dear...</h2>
        <p className="text-xl text-[#5A5A5A] mb-10 leading-relaxed">
          I made this just for the <span className="rose-text font-bold">5 of us</span>. 
          May I know who is reading this?
        </p>
        
        <input 
          type="text" 
          placeholder="Enter your first name..." 
          className="w-full bg-white/50 border-2 border-[#FFD6E0] rounded-full px-8 py-4 mb-10 outline-none focus:border-[#FF8FAB] transition-all text-center text-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onComplete(name || 'Bestie')}
        />

        <button 
          onClick={() => onComplete(name || 'Bestie')}
          className="gradient-button w-full py-5 font-bold text-xl uppercase tracking-widest"
        >
          Enter My Heart
        </button>
        <p className="mt-8 text-sm text-[#FF8FAB] font-handwritten text-2xl italic">— Love, Asmat</p>
      </motion.div>
    </motion.div>
  );
};

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  return (
    <div className="flex justify-center flex-wrap gap-x-1">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + (i * 0.05), ease: "linear" }}
          className="text-2xl md:text-3xl text-[#5A5A5A] font-medium"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const SparkleTrail = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const id = Math.random();
      const colors = ['#FFD6E0', '#E6D9FF', '#FF8FAB', '#FFC2D1'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      setParticles(prev => [...prev.slice(-15), { id, x, y, color }]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchstart', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[150]">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5, y: -20 }}
            exit={{ opacity: 0 }}
            style={{ left: p.x, top: p.y, color: p.color }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const SecretLetter = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleLetter = () => {
    if (!isOpen) onOpen();
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center py-24 px-4">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLetter}
        className="cursor-pointer relative flex flex-col items-center group"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div 
              key="closed"
              className="w-48 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-[#FFD6E0] group-hover:border-[#FF8FAB] transition-all"
            >
              <Mail className="w-14 h-14 text-[#FF8FAB] group-hover:animate-bounce" />
              <p className="absolute -top-12 text-sm font-bold text-[#FF8FAB] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">Open My Heart</p>
            </motion.div>
          ) : (
            <motion.div 
              key="open"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              className="w-full max-w-xl p-12 bg-[#FFFAF5] rounded-[3rem] shadow-2xl border-2 border-dashed border-[#FF8FAB] relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-[#FF8FAB] hover:scale-125 transition-transform"><X size={32} /></button>
              <div className="flex justify-center mb-8"><Heart className="w-12 h-12 text-[#FF8FAB] fill-[#FF8FAB]" /></div>
              <p className="font-handwritten text-4xl text-[#5A5A5A] leading-relaxed italic text-center">
                “I don’t want to prove I was right. I just want us to <span className="rose-text">be okay</span> again. Our normal days meant everything to me.”
              </p>
              <p className="mt-10 text-center text-lg font-bold text-[#FF8FAB] italic">— Always yours, Asmat</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Section = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    className={`py-32 px-6 max-w-5xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const Gallery = ({ onPhotoClick }: { onPhotoClick: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<null | { src: string, caption: string, message: string }>(null);
  
  const memories = [
    { 
      src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800", 
      caption: "Our Group Spark", 
      message: "This represents the 5 of us. Do you remember how we could talk for hours about nothing? That connection was so rare and beautiful." 
    },
    { 
      src: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800", 
      caption: "Academy Memories", 
      message: "The stress of the academy felt small because I had all four of you by my side. Every study break was an adventure." 
    },
    { 
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800", 
      caption: "Unfiltered Laughter", 
      message: "Your laughter is the sound I miss most. The way the 5 of us would double over in sync over the silliest jokes." 
    },
    { 
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", 
      caption: "Friendship Goals", 
      message: "We were a team. A safe space for each other. I want that safe space back more than anything else in the world." 
    },
    { 
      src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800", 
      caption: "A Piece of My Heart", 
      message: "This site is a letter to all 4 of you. You are each a vital part of who I am today. Thank you for being in my life." 
    },
    {
      src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
      caption: "Future Wishes",
      message: "I dream of the day we can all stand together again, with no barriers between us. Just five friends being themselves."
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
      {memories.map((m, i) => (
        <motion.div 
          key={i} 
          whileHover={{ scale: 1.08 }}
          className="relative aspect-square cursor-pointer group rounded-[40px] overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(255,143,171,0.4)] transition-all"
          onClick={() => { setSelectedImage(m); onPhotoClick(); }}
        >
          <img src={m.src} alt="Memory" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF8FAB]/60 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-8 transition-opacity">
             <div className="text-white text-center p-4 drop-shadow-lg">
                <Sparkles className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p className="font-handwritten font-bold text-2xl">{m.caption}</p>
             </div>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="max-w-4xl w-full bg-[#FFFAF5] rounded-[3.5rem] overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img src={selectedImage.src} alt="Zoomed" className="w-full h-auto max-h-[65vh] object-cover" />
                <button onClick={() => setSelectedImage(null)} className="absolute top-8 right-8 bg-white/40 backdrop-blur-md text-white p-3 rounded-full hover:bg-[#FF8FAB] transition-colors"><X size={32} /></button>
              </div>
              <div className="p-12 text-center">
                <h4 className="font-handwritten text-5xl rose-text mb-8 font-bold">{selectedImage.caption}</h4>
                <p className="text-2xl text-[#5A5A5A] leading-relaxed italic font-medium max-w-2xl mx-auto">{selectedImage.message}</p>
                <div className="mt-10 flex justify-center gap-4">
                  <Heart className="w-6 h-6 text-[#FF8FAB] fill-[#FF8FAB]" />
                  <Heart className="w-6 h-6 text-[#FF8FAB] fill-[#FF8FAB]" />
                  <Heart className="w-6 h-6 text-[#FF8FAB] fill-[#FF8FAB]" />
                  <Heart className="w-6 h-6 text-[#FF8FAB] fill-[#FF8FAB]" />
                  <Heart className="w-6 h-6 text-[#FF8FAB] fill-[#FF8FAB]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [compliment, setCompliment] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const runConfetti = () => {
    setTriggerConfetti(true);
    setTimeout(() => setTriggerConfetti(false), 2000);
  };

  const handleFinalClick = () => {
    setShowFinalMessage(true);
    runConfetti();
  };

  const showCompliment = () => {
    const random = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
    setCompliment(random);
    runConfetti();
    setTimeout(() => setCompliment(null), 4000);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#FF8FAB] selection:text-white overflow-x-hidden">
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#FFFAF5] flex flex-col items-center justify-center"
          >
            <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
              <Heart className="w-32 h-32 text-[#FFD6E0] fill-[#FFD6E0]" />
            </motion.div>
            <p className="font-handwritten text-5xl text-[#5A5A5A] mt-10 animate-pulse text-center px-6 leading-relaxed">Preparing a letter from Asmat's heart...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && !userName && (
          <WelcomeModal onComplete={(name) => setUserName(name)} />
        )}
      </AnimatePresence>

      <SparkleTrail />
      <Confetti active={triggerConfetti} />
      <GlobalParticles />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-4xl relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={userName ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.5 }}>
            <p className="text-[#FF8FAB] font-handwritten text-4xl mb-6 italic">From your beloved friend Asmat</p>
            <h1 className="text-7xl md:text-9xl font-handwritten rose-text mb-12 leading-tight drop-shadow-sm">
              {userName}, For My Favorite Girls 💗
            </h1>
            <div className="flex flex-col gap-6 mb-16">
              <Typewriter text={`I really miss the 5 of us`} delay={1} />
              <Typewriter text={`together, ${userName}.`} delay={2.3} />
            </div>
            <Typewriter text="I really miss our normal days..." delay={4.5} />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={userName ? { opacity: 1 } : {}} transition={{ delay: 6, duration: 2 }} className="mt-28 flex flex-col items-center">
            <div className="animate-bounce mb-8">
              <Clock className="text-[#FFD6E0] w-12 h-12" />
            </div>
            <p className="text-sm text-[#5A5A5A] font-bold tracking-[0.6em] uppercase">Scroll Into Our World</p>
          </motion.div>
        </div>
      </section>

      {/* --- APOLOGY --- */}
      <Section>
        <div className="glass p-16 md:p-24 text-center border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20"><Heart size={80} className="text-[#FF8FAB]" /></div>
          <h2 className="text-6xl font-handwritten rose-text mb-12">I'm Sorry, {userName}...</h2>
          <p className="text-3xl leading-relaxed text-[#5A5A5A] italic font-medium max-w-3xl mx-auto">
            “If I said something or did something that hurt any of you, please know it was never my intention. 
            I miss the way the 5 of us were. I don't want to prove I was right... <span className="rose-text">I just want us to be okay</span>.”
          </p>
          <div className="mt-16 flex flex-col items-center">
             <div className="w-20 h-0.5 bg-[#FFD6E0] mb-8" />
             <p className="font-handwritten text-4xl text-[#FF8FAB]">Love always, Asmat</p>
          </div>
        </div>
      </Section>

      {/* --- TIMELINE --- */}
      <Section className="text-center">
        <h3 className="text-5xl font-handwritten rose-text mb-20 flex items-center justify-center gap-4">
          <Calendar size={48} /> Our Shared Path
        </h3>
        <MemoryTimeline />
      </Section>

      {/* --- INSIDE JOKES --- */}
      <Section>
        <h3 className="text-5xl font-handwritten text-center rose-text mb-20">Things Only the 5 of Us Know...</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {INSIDE_JOKES.map((joke, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-10 flex flex-col items-center text-center shadow-lg border-none"
            >
              <div className="mb-6 p-4 bg-white rounded-full shadow-sm">{joke.icon}</div>
              <p className="text-2xl text-[#5A5A5A] italic font-medium leading-relaxed">"{joke.text}"</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- LESSONS LEARNED --- */}
      <Section className="bg-[#E6D9FF]/10 rounded-[4rem]">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-handwritten rose-text mb-6">What You All Taught Me</h3>
          <p className="text-xl text-[#5A5A5A] italic">Friendship isn't just about fun; it's about becoming a better person.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Loyalty", desc: "How to stand by someone even in the hardest storms.", icon: <Users /> },
            { title: "Laughter", desc: "How to find joy even when the academy was overwhelming.", icon: <Laugh /> },
            { title: "Grace", desc: "How to forgive and grow together, side by side.", icon: <Book /> }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-[#FF8FAB] mb-6 border-2 border-[#FFD6E0]">{item.icon}</div>
              <h4 className="text-2xl font-bold text-[#5A5A5A] mb-3">{item.title}</h4>
              <p className="text-[#5A5A5A] text-lg leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* --- GALLERY --- */}
      <Section className="py-28">
        <h2 className="text-7xl font-handwritten text-center rose-text mb-24">The 5 Hearts in Pictures</h2>
        <Gallery onPhotoClick={runConfetti} />
      </Section>

      {/* --- SECRET ENVELOPE --- */}
      <Section className="text-center">
         <SecretLetter onOpen={runConfetti} />
      </Section>

      {/* --- FINAL CTA --- */}
      <Section className="text-center py-52">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2.5 }} className="mb-24">
          <p className="text-6xl font-handwritten rose-text leading-snug">“Even if things stay different, {userName}, I will still pray for your happiness.”</p>
        </motion.div>
        
        <div className="relative inline-block">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinalClick}
            className="gradient-button py-10 px-24 text-4xl font-bold flex items-center gap-6 shadow-[0_30px_60px_rgba(255,143,171,0.5)] relative z-10"
          >
            <Sparkles className="w-10 h-10" />
            A Final Wish
          </motion.button>
          <div className="absolute -inset-10 bg-[#FFD6E0]/40 blur-[80px] rounded-full -z-10 animate-pulse" />
        </div>
      </Section>

      {/* --- FLOATING COMPLIMENT BUTTON --- */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
        <AnimatePresence>
          {compliment && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="glass px-10 py-6 mb-8 text-center border-2 border-[#FF8FAB] shadow-2xl min-w-[300px]"
            >
              <p className="font-handwritten text-3xl rose-text leading-tight">{compliment}</p>
              <div className="mt-3 text-[#FF8FAB] flex justify-center gap-1">
                <Heart size={16} fill="#FF8FAB" />
                <Heart size={16} fill="#FF8FAB" />
                <Heart size={16} fill="#FF8FAB" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={showCompliment}
          className="gradient-button p-6 rounded-full shadow-2xl flex items-center gap-3 border-4 border-white"
        >
          <Gift className="w-8 h-8" />
          <span className="font-bold text-lg uppercase tracking-widest hidden md:inline">Click if You're Still My Friend</span>
        </motion.button>
      </div>

      {/* --- FINAL POPUP --- */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[160] bg-[#FFFAF5]/90 backdrop-blur-2xl flex items-center justify-center p-6" 
            onClick={() => setShowFinalMessage(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 100 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.8, y: 100 }} 
              className="glass p-16 md:p-24 text-center max-w-3xl relative border-none shadow-[0_50px_100px_rgba(0,0,0,0.1)]" 
              onClick={e => e.stopPropagation()}
            >
              <X className="absolute top-10 right-10 cursor-pointer text-[#5A5A5A] w-12 h-12 hover:rose-text transition-colors" onClick={() => setShowFinalMessage(false)} />
              <div className="mb-12">
                <Heart className="w-24 h-24 rose-text fill-[#FF8FAB] mx-auto mb-10 animate-pulse" />
                <h2 className="text-6xl font-handwritten rose-text mb-6">My Heart is Always Open</h2>
              </div>
              <div className="space-y-10 text-2xl text-[#5A5A5A] leading-relaxed italic font-medium">
                <p>"To the girls who made the academy feel like home..."</p>
                <p>
                  "I value the <span className="rose-text font-bold underline decoration-[#FFD6E0] underline-offset-8">5-way connection</span> we once had more than my own pride. I'm ready to listen whenever you're ready to speak."
                </p>
              </div>
              <div className="mt-20">
                <p className="font-handwritten text-5xl rose-text mb-4">Love always,</p>
                <p className="font-handwritten text-6xl font-bold text-[#FF8FAB]">Asmat.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER --- */}
      <footer className="py-32 text-center border-t border-[#FFD6E0]/40 bg-[#FFFAF5]/50 relative overflow-hidden">
        <div className="flex justify-center gap-10 mb-12">
          <Heart className="w-8 h-8 rose-text opacity-40" />
          <Star className="w-8 h-8 rose-text opacity-40" />
          <Heart className="w-8 h-8 rose-text opacity-40" />
        </div>
        <p className="text-3xl font-handwritten text-[#5A5A5A] px-10 mb-12 max-w-2xl mx-auto leading-relaxed">
          "No matter where the road takes us, I am grateful that our paths crossed at the academy."
        </p>
        <div className="mt-20 opacity-30 font-bold tracking-[0.8em] text-[10px] uppercase text-[#5A5A5A]">
          Digital Memory Journal • Created by Asmat with Love
        </div>
      </footer>
    </div>
  );
}
