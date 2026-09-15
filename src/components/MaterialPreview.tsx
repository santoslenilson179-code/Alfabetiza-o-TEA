import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PREVIEW_CARDS } from '../data';
import { BookOpen, Puzzle, Sparkles, CheckCircle, RefreshCw, PenTool, Eraser, Info } from 'lucide-react';

export default function MaterialPreview() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'words' | 'tracing'>('flashcards');
  
  // Flashcards state
  const [selectedCard, setSelectedCard] = useState(PREVIEW_CARDS[0]);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Word Game states
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWordData = PREVIEW_CARDS[currentWordIndex];
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [shuffledSyllables, setShuffledSyllables] = useState<string[]>([]);

  // Tracing Canvas states
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Shuffles syllables when current index changes
  useEffect(() => {
    if (!currentWordData) return;
    const correct = currentWordData.syllables;
    // Add 2 random distractors from other words
    const distractors = PREVIEW_CARDS
      .filter((_, idx) => idx !== currentWordIndex)
      .flatMap(card => card.syllables)
      .slice(0, 2);
    
    const combined = [...correct, ...distractors];
    // Shuffle
    const shuffled = combined.sort(() => Math.random() - 0.5);
    setShuffledSyllables(shuffled);
    setSelectedSyllables([]);
    setGameWon(false);
  }, [currentWordIndex]);

  const handleSyllableClick = (syllable: string) => {
    if (gameWon) return;
    const newSelection = [...selectedSyllables, syllable];
    setSelectedSyllables(newSelection);

    // Check progress
    const correctSyllables = currentWordData.syllables;
    const isCorrectSoFar = newSelection.every((s, idx) => s === correctSyllables[idx]);

    if (!isCorrectSoFar) {
      // Mistake! Reset selection with a small bounce
      setTimeout(() => {
        setSelectedSyllables([]);
      }, 600);
      return;
    }

    if (newSelection.length === correctSyllables.length) {
      setGameWon(true);
    }
  };

  // Tracing Canvas code
  useEffect(() => {
    if (activeTab !== 'tracing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 300;

    // Draw reference letter 'A' in dotted lines
    drawLetterA(ctx);
  }, [activeTab]);

  const drawLetterA = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 400, 300);
    ctx.strokeStyle = '#cbd5e1'; // Light slate color
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([10, 10]); // Dotted line

    // Draw Letter A
    ctx.beginPath();
    ctx.moveTo(150, 250);
    ctx.lineTo(200, 50);
    ctx.lineTo(250, 250);
    ctx.moveTo(175, 160);
    ctx.lineTo(225, 160);
    ctx.stroke();

    // Arrows or instructions
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';
    ctx.fillText("Comece aqui ↑", 110, 270);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#14b8a6'; // Teal tracing line
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const coords = getEventCoords(e, canvas);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getEventCoords(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getEventCoords = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawLetterA(ctx);
    setHasDrawn(false);
  };

  return (
    <div id="preview-section" className="bg-white rounded-3xl shadow-xl border border-brand-pink/15 p-6 md:p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <span className="bg-brand-pink/10 text-brand-pink px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 fill-brand-pink/20" /> Experimente o Método ABC de Graça
        </span>
        <h3 className="text-2xl md:text-3xl font-bold font-sans text-slate-800 tracking-tight">
          Amostra das Atividades Interativas
        </h3>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto mt-2">
          Veja abaixo como adaptamos as rotinas de ensino. Experimente navegar pelas três formas inovadoras de aprendizagem visual.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-2xl mb-8">
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-center text-xs font-semibold transition-all duration-300 ${
            activeTab === 'flashcards'
              ? 'bg-white text-brand-pink shadow-sm border border-slate-100 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-brand-pink" />
          <span>Pareamento</span>
        </button>

        <button
          onClick={() => setActiveTab('words')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-center text-xs font-semibold transition-all duration-300 ${
            activeTab === 'words'
              ? 'bg-white text-brand-green shadow-sm border border-slate-100 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Puzzle className="w-4 h-4 text-brand-green" />
          <span>Sílaba Amiga</span>
        </button>

        <button
          onClick={() => setActiveTab('tracing')}
          className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-2 sm:px-4 rounded-xl text-center text-xs font-semibold transition-all duration-300 ${
            activeTab === 'tracing'
              ? 'bg-white text-brand-red shadow-sm border border-slate-100 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PenTool className="w-4 h-4 text-brand-red" />
          <span>Fino Tracejado</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[380px] flex items-center justify-center bg-slate-50/50 rounded-2xl p-4 md:p-6 border border-dashed border-slate-200">
        <AnimatePresence mode="wait">
          {/* TAB 1: FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 space-y-4">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-pink" /> Toque para escolher a Letra:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {PREVIEW_CARDS.slice(0, 8).map((card) => (
                    <button
                      key={card.letter}
                      onClick={() => {
                        setSelectedCard(card);
                        setCardFlipped(false);
                      }}
                      className={`h-12 w-full text-lg font-bold rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        selectedCard.letter === card.letter
                          ? 'bg-brand-pink text-white scale-105 shadow-md border-transparent'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-sm'
                      }`}
                    >
                      {card.letter}
                    </button>
                  ))}
                </div>
                <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-100 text-xs text-amber-900 mt-2">
                  <strong>💡 Por que é eficaz?</strong> Cada letra está associada a uma única imagem sem distractores sensoriais, facilitando o pareamento imediato.
                </div>
              </div>

              {/* Card visualizer */}
              <div className="md:col-span-7 flex flex-col items-center">
                <motion.div
                  onClick={() => setCardFlipped(!cardFlipped)}
                  key={selectedCard.letter}
                  animate={{ rotateY: cardFlipped ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`relative w-64 h-80 cursor-pointer select-none rounded-2xl shadow-lg border-2 flex flex-col items-center justify-center p-6 ${selectedCard.color}`}
                >
                  {/* Front Side */}
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans"
                  >
                    <div className="text-8xl font-black tracking-tight">{selectedCard.letter}</div>
                    <div className="text-6xl">{selectedCard.imageEmoji}</div>
                    <div className="text-xs bg-slate-950/5 text-slate-800 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                      Clique para Ver a Sílaba
                    </div>
                  </div>

                  {/* Back Side (180 deg flipped) */}
                  <div
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4"
                  >
                    <div className="text-5xl">{selectedCard.imageEmoji}</div>
                    <div className="text-3xl font-black tracking-wide font-sans">{selectedCard.word}</div>
                    <div className="text-2xl font-bold text-slate-500 bg-white/60 px-4 py-1.5 rounded-xl border border-slate-200/50">
                      {selectedCard.meaning}
                    </div>
                    <div className="text-xs text-slate-400">Excelente! Toque para fechar</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: SILABANDO (WORD BUILDER GAME) */}
          {activeTab === 'words' && (
            <motion.div
              key="words"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center max-w-lg"
            >
              {/* Info top */}
              <div className="text-slate-500 text-xs font-semibold mb-3 flex items-center justify-between w-full">
                <span>Monte a Palavra:</span>
                <span className="text-brand-green font-extrabold">Atividade {currentWordIndex + 1} de {PREVIEW_CARDS.length}</span>
              </div>

              {/* Monster / Image Frame */}
              <div className="relative w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 flex flex-col items-center justify-center">
                <div className="text-7xl mb-3 animate-bounce">{currentWordData.imageEmoji}</div>
                
                {/* Result slots */}
                <div className="flex gap-2 min-h-[50px] items-center justify-center mb-1">
                  {currentWordData.syllables.map((syl, idx) => {
                    const selected = selectedSyllables[idx];
                    return (
                      <div
                        key={idx}
                        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold tracking-wider uppercase transition-all duration-300 ${
                          selected
                            ? 'bg-brand-green text-white border-transparent'
                            : 'bg-slate-50 border-dashed border-slate-300 text-slate-300'
                        }`}
                      >
                        {selected || "?"}
                      </div>
                    );
                  })}
                </div>

                {gameWon && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-brand-green/95 rounded-2xl flex flex-col items-center justify-center text-white"
                  >
                    <CheckCircle className="w-12 h-12 text-white mb-2 fill-brand-green" />
                    <h4 className="text-xl font-bold mb-1">Incrível! Você acertou!</h4>
                    <p className="text-xs text-white/80 uppercase tracking-widest font-black">{currentWordData.word}</p>
                    <button
                      onClick={() => {
                        setCurrentWordIndex((prev) => (prev + 1) % PREVIEW_CARDS.length);
                      }}
                      className="mt-4 bg-white text-brand-green hover:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition cursor-pointer"
                    >
                      Próxima Palavra <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Syllable options bucket */}
              <div className="space-y-3 w-full">
                <p className="text-center text-xs text-slate-400 font-semibold">Tente selecionar as sílabas na ordem correta:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {shuffledSyllables.map((syl, index) => {
                    // Check if already used
                    const isUsedCount = selectedSyllables.filter(s => s === syl).length;
                    const indexInSelection = selectedSyllables.indexOf(syl);
                    const isSelectable = indexInSelection === -1;

                    return (
                      <button
                        key={`${syl}-${index}`}
                        disabled={gameWon || !isSelectable}
                        onClick={() => handleSyllableClick(syl)}
                        className={`px-5 py-3.5 text-base md:text-lg font-black rounded-xl border shadow-sm transition duration-300 cursor-pointer ${
                          !isSelectable
                            ? 'opacity-40 bg-slate-200 text-slate-400 border-transparent cursor-not-allowed'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 active:scale-95'
                        }`}
                      >
                        {syl}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: TRACING (MOTOR SKILLS SKETCHPAD) */}
          {activeTab === 'tracing' && (
            <motion.div
              key="tracing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4 max-w-[400px]">
                <div className="text-xs font-bold text-slate-500 mb-2 sm:mb-0">
                  Cubra a Letra com o dedo ou mouse:
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearCanvas}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Eraser className="w-3.5 h-3.5" /> Começar Novamente
                  </button>
                </div>
              </div>

              {/* Canvas Wrapper */}
              <div className="relative border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-inner">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-auto max-w-[400px] touch-none cursor-crosshair pb-1"
                />
                
                {!hasDrawn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 pointer-events-none">
                    <span className="bg-slate-900/70 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-pulse">
                      ✍️ Arraste para desenhar / cobrir
                    </span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center max-w-[380px]">
                Nossos cadernos têm fontes adaptadas com marcadores coloridos de onde começar e onde parar para auxiliar a motricidade.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
