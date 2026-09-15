import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data';
import { Award, ArrowRight, Play, CheckCircle, RefreshCcw, Landmark, Download, ShieldCheck } from 'lucide-react';

interface InteractiveQuizProps {
  onOpenCheckout: (planType: string) => void;
}

export default function InteractiveQuiz({ onOpenCheckout }: InteractiveQuizProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelectOption = (score: string) => {
    const nextAnswers = [...collectedAnswers, score];
    setCollectedAnswers(nextAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setCollectedAnswers([]);
    setQuizFinished(false);
  };

  // Determine the final diagnosis
  const getQuizResult = () => {
    const counts = collectedAnswers.reduce((acc, current) => {
      acc[current] = (acc[current] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get the highest occurring category
    let bestFit = "starter";
    let maxCount = 0;
    for (const category in counts) {
      const count = counts[category] || 0;
      if (count > maxCount) {
        maxCount = count;
        bestFit = category;
      }
    }

    if (bestFit === "intermediate") {
      return {
        title: "Nível 3: Alfabetização Combinada",
        description: "Seu filho já tem excelente aptidão visual e reconhece símbolos! Ele está pronto para formar palavras complexas e pequenas frases ilustradas.",
        badge: "Pronto para decolar",
        focus: "Foco na consolidação das dificuldades ortográficas de forma lúdica",
        percentage: 82,
        color: "from-brand-purple to-brand-blue-med",
        plan: "Completo"
      };
    } else if (bestFit === "basic") {
      return {
        title: "Nível 2: Sílabas Simples e Sons",
        description: "Ele já demonstra interesse nas letras soltas! O foco agora deve ser o método fônico clássico adaptado para parear sílabas básicas (BA-BE-BI-BO-BU, CA-CO-CU).",
        badge: "Fase de Junção",
        focus: "Foco em treinar a fluência fonológica com imagens sem sobrecarga",
        percentage: 95,
        color: "from-brand-green to-emerald-500",
        plan: "Recomendado"
      };
    } else {
      return {
        title: "Nível 1: Pré-Alfabetização Motora e Sensorial",
        description: "Excelente fase de descoberta! É ideal iniciar pelo estímulo da motricidade fina, prender o foco visual de forma divertida e fazer associação simples das letras clássicas com animais correspondentes.",
        badge: "Primeiros Passos",
        focus: "Foco em diminuir a frustração, criar gosto pelos livros e coordenação motora",
        percentage: 100,
        color: "from-brand-orange to-brand-yellow",
        plan: "Essencial"
      };
    }
  };

  const result = quizFinished ? getQuizResult() : null;

  return (
    <div className="bg-slate-900 text-white rounded-3xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto overflow-hidden relative border border-slate-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue-med/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32"></div>

      <AnimatePresence mode="wait">
        {/* State 1: Welcome / Start Screen */}
        {!started && (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-6 relative z-10"
          >
            <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-slate-700">
              <Award className="w-8 h-8 text-brand-blue-light" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Descubra o Nível Ideal para Seu Filho
            </h3>
            <p className="text-slate-405 text-slate-400 text-sm max-w-md mx-auto mb-8">
              Responda a 4 perguntas rápidas criadas por nossos especialistas em educação TEA e receba um diagnóstico personalizado do ritmo de aprendizagem atual.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 transform active:scale-95 cursor-pointer text-sm shadow-lg shadow-brand-orange/10"
            >
              Começar Teste Rápido <Play className="w-4 h-4 fill-white" />
            </button>
            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Respostas 100% anônimas e seguras
            </div>
          </motion.div>
        )}

        {/* State 2: Active Question */}
        {started && !quizFinished && (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            {/* Header progress info */}
            <div className="flex justify-between items-center mb-6 text-xs text-brand-blue-light font-extrabold uppercase tracking-widest">
              <span>Pergunta {currentQuestion + 1} de {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}% concluído</span>
            </div>

            {/* Progress line */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-brand-blue-med rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h4 className="text-lg md:text-xl font-bold text-slate-100 mb-6 font-sans">
              {QUIZ_QUESTIONS[currentQuestion].question}
            </h4>

            {/* Options vertical pile */}
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.score)}
                  className="w-full text-left bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500 rounded-xl p-4 transition-all duration-300 cursor-pointer flex items-center justify-between group active:scale-[0.99]"
                >
                  <span className="text-sm text-slate-200 group-hover:text-white pr-4">{option.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-blue-light transition transform group-hover:translate-x-1 flex-shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* State 3: Quiz Finished Diagnostico screen */}
        {quizFinished && result && (
          <motion.div
            key="finish-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative z-10"
          >
            <div className="text-center mb-6">
              <span className="bg-brand-blue-med/20 text-brand-blue-light border border-brand-blue-med/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-3">
                🎯 Diagnóstico Concluído
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">
                Recomendação para seu Filho
              </h3>
            </div>

            {/* Recommendation card */}
            <div className={`rounded-2xl bg-gradient-to-br ${result.color} p-6 mb-6 shadow-xl text-white`}>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest">
                  {result.badge}
                </span>
                <span className="text-white/80 text-xs font-bold">Afinidade: {result.percentage}%</span>
              </div>
              <h4 className="text-lg font-bold mb-2">{result.title}</h4>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                {result.description}
              </p>
              <div className="bg-black/15 rounded-xl p-3 text-xs flex items-start gap-1.5 border border-white/5">
                <span>⚡</span>
                <span><strong>Plano sugerido:</strong> {result.focus}</span>
              </div>
            </div>

            {/* Next steps blocks */}
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl mb-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div>
                <p className="text-xs text-slate-400">Todo o acervo estruturado está pronto:</p>
                <h5 className="text-sm font-bold text-slate-200">Material Completo de Alfabetização TEA</h5>
              </div>
              <button
                onClick={() => onOpenCheckout(result.plan)}
                className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center justify-center gap-1 transition cursor-pointer"
              >
                Garantir Material Adaptado <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Action bottoms footer */}
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <button
                onClick={resetQuiz}
                className="text-slate-450 hover:text-white text-xs font-bold py-2 px-4 transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" /> Refazer teste de perfil
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
