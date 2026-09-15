import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Sparkles, AlertCircle, Check, HelpCircle, 
  ChevronDown, ChevronUp, Star, Printer, BookOpen, 
  Download, ShieldCheck, Mail, ArrowRight, Lightbulb, 
  Smile, UserCheck, Accessibility, Laptop, Volume2, Award
} from 'lucide-react';

import { TESTIMONIALS, FAQS } from './data';
import MaterialPreview from './components/MaterialPreview';
import InteractiveQuiz from './components/InteractiveQuiz';
import CheckoutSimulator from './components/CheckoutSimulator';
// @ts-ignore
import heroImage from './assets/images/metodo_abc_banner_1781285707745.jpg';

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Completo');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const triggerCheckout = (planName: string) => {
    window.open('https://pay.kiwify.com.br/bf9HQNe', '_blank');
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-brand-blue-med/15 selection:text-brand-blue-dark overflow-x-hidden">
      
      {/* Upper Micro-Banner for trust */}
      <div className="bg-gradient-to-r from-brand-blue-dark via-brand-blue-med to-brand-purple text-white text-center py-2.5 px-4 text-xs font-bold tracking-wide">
        🚀 Oferta Especial de Lançamento por Tempo Limitado: De <span className="line-through opacity-85">R$ 197</span> por apenas <strong>R$ 27 (Pagamento Único)</strong>
      </div>

      {/* Navigation Brand Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-brand-blue-med/10 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <span className="font-display font-extrabold text-base md:text-lg text-brand-blue-dark tracking-tight block">
                Método ABC
              </span>
              <span className="text-[10px] text-brand-blue-med font-extrabold uppercase tracking-widest block">
                Especializado em Crianças Autistas (TEA)
              </span>
            </div>
          </div>
          
          <button
            onClick={() => triggerCheckout('Completo')}
            className="bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-2 px-4 rounded-xl text-xs transition active:scale-95 shadow-md shadow-brand-orange/15 cursor-pointer"
          >
            Quero o Material Completo
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-white via-brand-blue-med/5 to-slate-50 pt-10 pb-16 md:py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          
          {/* Headline / Title block */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-brand-blue-med/10 border border-brand-blue-med/20 text-brand-blue-dark py-1.5 px-3 rounded-full text-xs font-bold uppercase animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue-med fill-brand-blue-med/20" /> Método ABC Acolhedor e Colorido
            </div>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-brand-blue-dark tracking-tight leading-tight max-w-3xl mx-auto">
              Mais de 1200 atividades para a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-med via-brand-purple to-brand-coral">Alfabetização de Crianças Autistas</span>
            </h1>

            <p className="text-slate-600 text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
              O Método ABC é um método acolhedor, visual e adaptado para o seu filho aprender no próprio ritmo.
            </p>
          </div>

          {/* Centered Premium Mockup Image */}
          <div className="relative w-full max-w-md md:max-w-lg flex flex-col items-center">
            <div className="absolute inset-0 bg-brand-blue-med/10 rounded-full blur-3xl -z-10 transform scale-110"></div>
            <div className="bubble-pulse border-8 border-white bg-slate-100 rounded-3xl overflow-hidden shadow-2xl w-full">
              <img
                src={heroImage}
                alt="Kit Alfabetização Autista Mockup"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="bg-slate-900 text-white p-3.5 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-2">
                <Printer className="w-4 h-4 text-brand-yellow animate-bounce" /> Atividades em PDF Prontas para Imprimir de Casa!
              </div>
            </div>
          </div>

          {/* Large conversion controls */}
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl">
              <button
                onClick={() => triggerCheckout('Completo')}
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm md:text-base font-black px-8 py-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all text-center flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                [QUERO AJUDAR MEU FILHO A SE ALFABETIZAR]
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#preview-section"
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold px-6 py-4 rounded-xl text-center shadow-xs transition cursor-pointer text-sm md:text-base flex items-center justify-center"
              >
                Ver Amostra Grátis
              </a>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              🔒 Garantia incondicional de 7 dias com devolução integral do valor se não se adaptar.
            </p>
          </div>

          {/* Additional details (Benefit badges + validation boxes) */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-6 border-t border-slate-100">
            
            {/* Pain point validation text box */}
            <div className="bg-amber-50/80 border-l-4 border-brand-orange rounded-r-2xl p-4 text-xs text-slate-700 flex flex-col justify-center">
              <div className="flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-950 block mb-0.5">Seu filho tem resistência para fixar a atenção?</strong>
                  Muitas famílias enfrentam severas barreiras no processo de alfabetização convencional de crianças com TEA devido ao excesso de distrações. Nosso material elimina a sobrecarga sensorial para focar apenas no progresso leve e de forma divertida.
                </div>
              </div>
            </div>

            {/* Micro proof badges from the official poster image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-150 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-brand-blue-med/10 flex items-center justify-center text-brand-blue-med flex-shrink-0 text-sm font-bold border border-brand-blue-med/20">👁️</div>
                <span className="text-[11px] text-slate-705 font-extrabold leading-tight uppercase tracking-wide">Atividades Visuais</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-150 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0 text-sm font-bold border border-brand-purple/20">🧩</div>
                <span className="text-[11px] text-slate-750 font-extrabold leading-tight uppercase tracking-wide">Aprendizado Lúdico</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-150 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green flex-shrink-0 text-sm font-bold border border-brand-green/25 border-dashed">📊</div>
                <span className="text-[11px] text-slate-750 font-extrabold leading-tight uppercase tracking-wide">Evolução no Próprio Ritmo</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-150 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-brand-coral/10 flex items-center justify-center text-brand-coral flex-shrink-0 text-sm font-bold border border-brand-coral/20">❤️</div>
                <span className="text-[11px] text-slate-750 font-extrabold leading-tight uppercase tracking-wide">Mais Confiança e Autonomia</span>
              </div>
            </div>

          </div>

          <div className="w-full p-4 bg-brand-blue-med/5 border border-brand-blue-med/15 rounded-2xl flex items-center justify-center gap-3 max-w-xl mx-auto">
            <span className="text-xl">🤝</span>
            <p className="text-[11px] text-brand-blue-dark leading-relaxed font-extrabold uppercase tracking-wide text-left sm:text-center">
              Aprender pode ser leve, divertido e significativo. Seu filho pode, e nós estamos aqui para ajudar!
            </p>
          </div>

        </div>
      </section>

      {/* INTERACTIVE PREVIEW PLATFORM (SENSORY PLAY PREVIEW) */}
      <section className="py-16 md:py-24 px-6 bg-slate-50 text-slate-800 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <MaterialPreview />
        </div>
      </section>

      {/* THE VALUE VALUE PROPOSITION & CRITICAL SYLLABUS SECTION */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-blue-med text-xs font-bold uppercase tracking-widest bg-brand-blue-med/10 px-3.5 py-1.5 rounded-full">
              Pedagogia Prática de Resultado
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-blue-dark mt-3 tracking-tight">
              O Que Seu Filho Vai Aprender?
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              Estruturado de forma incremental, o material cobre do reconhecimento inicial ao progresso seguro da leitura autônoma.
            </p>
          </div>

          {/* Grid of learning pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white border border-brand-blue-med/10 p-6 rounded-2xl transition hover:shadow-md">
              <div className="w-10 h-10 bg-brand-orange/15 text-brand-orange font-bold rounded-xl flex items-center justify-center text-xl mb-4">🔤</div>
              <h3 className="font-display font-bold text-brand-blue-dark text-base mb-2">Letras e Sons Mágicos</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aprender o abecedário através de associação direta de alta conformidade fônica e correspondência de desenhos limpos.
              </p>
            </div>

            <div className="bg-white border border-brand-blue-med/10 p-6 rounded-2xl transition hover:shadow-md">
              <div className="w-10 h-10 bg-brand-blue-med/15 text-brand-blue-med font-bold rounded-xl flex items-center justify-center text-xl mb-4">🧩</div>
              <h3 className="font-display font-bold text-brand-blue-dark text-base mb-2">União de Sílabas e Palavras</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Atividades de arrastar e colar imagens para formar pequenos blocos de sílabas básicas fáceis de assimilar visualmente.
              </p>
            </div>

            <div className="bg-white border border-brand-blue-med/10 p-6 rounded-2xl transition hover:shadow-md">
              <div className="w-10 h-10 bg-brand-purple/15 text-brand-purple font-bold rounded-xl flex items-center justify-center text-xl mb-4">📖</div>
              <h3 className="font-display font-bold text-brand-blue-dark text-base mb-2">Leitura Gradual Auxiliada</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pequenas histórias curtas e simples de linha única projetadas com baixo estresse cognitivo para prender a autoconfiança de ler sozinho.
              </p>
            </div>

            <div className="bg-white border border-brand-blue-med/10 p-6 rounded-2xl transition hover:shadow-md">
              <div className="w-10 h-10 bg-brand-coral/15 text-brand-coral font-bold rounded-xl flex items-center justify-center text-xl mb-4">✍️</div>
              <h3 className="font-display font-bold text-brand-blue-dark text-base mb-2">Coordenação Motora Fina</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gabaritos pontilhados generosos de animais para cobrir, ajudando a treinar a preensão de lápis e movimentos de escrita fundamentais.
              </p>
            </div>

            <div className="bg-white border border-brand-blue-med/10 p-6 rounded-2xl transition hover:shadow-md">
              <div className="w-10 h-10 bg-brand-green/15 text-brand-green font-bold rounded-xl flex items-center justify-center text-xl mb-4">🐱</div>
              <h3 className="font-display font-bold text-brand-blue-dark text-base mb-2">Ampliação de Vocabulário</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pareamento prático do cotidiano: cores, brinquedos, alimentos, e animais domésticos para expandir canais de comunicação verbal e sinalizada.
              </p>
            </div>

            <div className="bg-white border border-brand-blue-med/10 p-6 rounded-2xl transition hover:shadow-md">
              <div className="w-10 h-10 bg-brand-blue-light/15 text-brand-blue-dark font-bold rounded-xl flex items-center justify-center text-xl mb-4">🧠</div>
              <h3 className="font-display font-bold text-brand-blue-dark text-base mb-2">Foco e Regulação Mental</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Exercícios tranquilos baseados em rituais pedagógicos claros de início, meio e fim para apoiar e fortalecer a neurodiversidade TEA.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DIAGNOSTIC PORTAL (INTERACTIVE USER QUIZ) */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-slate-900 via-brand-blue-dark/20 to-slate-950 text-white relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="bg-brand-blue-med/20 text-brand-blue-light border border-brand-blue-med/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Diagnóstico Exclusivo
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl mt-3 text-white tracking-tight leading-tight">
              Faça a Triagem Pedagógica Rápida
            </h2>
            <p className="text-slate-405 text-slate-400 text-xs md:text-sm mt-2">
              Descubra qual caderno do kit corresponde perfeitamente ao progresso sensorial e intelectual atual do seu pequeno.
            </p>
          </div>

          <InteractiveQuiz onOpenCheckout={triggerCheckout} />
        </div>
      </section>

      {/* TARGET AUDIENCE / PARA QUEM É ESTE MATERIAL */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="font-display font-black text-3xl text-brand-blue-dark tracking-tight mb-6">
                Para Quem Indicamos Este Material de Ensino?
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-brand-green/15 text-brand-green rounded-full p-1.5 flex h-fit">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-blue-dark">Mães e Pais Preocupados</h4>
                    <p className="text-xs text-slate-500">Que querem ensinar de casa de modo calmo, com afeto e carinho, sem forçar cansaço.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-brand-green/15 text-brand-green rounded-full p-1.5 flex h-fit">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-blue-dark">Crianças Autistas de Todos os Níveis</h4>
                    <p className="text-xs text-slate-500">De 3 a 10 anos que enfrentaram barreiras de ansiedade com cadernos infantis comuns.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-brand-green/15 text-brand-green rounded-full p-1.5 flex h-fit font-bold">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-blue-dark">Profissionais da Saúde e Educação</h4>
                    <p className="text-xs text-slate-500">Psicopedagogas, professoras de AEE e Terapeutas Ocupacionais que buscam recursos prontos para o consultório.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why it works showcase box */}
            <div className="bg-gradient-to-tr from-brand-blue-med/5 to-brand-green/5 border border-brand-blue-med/15 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-44 h-44 bg-brand-blue-med/10 rounded-full blur-2xl"></div>
              
              <h3 className="font-display font-extrabold text-xl text-brand-blue-dark mb-4">
                💡 Por que o Método ABC funciona de verdade?
              </h3>
              
              <ul className="space-y-3.5 text-xs text-slate-700">
                <li className="flex gap-2 items-start">
                  <span className="text-brand-blue-med font-extrabold">🧩 visual:</span>
                  <span>Estímulos visuais limpos e isolados favorecem a fixação em cérebros hiperfocados.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-brand-purple font-extrabold">🎯 lúdica:</span>
                  <span>Brincadeiras didáticas que transformam a atenção em recompensa positiva suave.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-brand-green font-extrabold">📖 gradual:</span>
                  <span>Dificuldade progressiva milimetricamente regulada para blindar contra frustrações.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-brand-orange font-extrabold">⭐ reforço:</span>
                  <span>Celebração de pequenas vitórias cotidianas para dar autonomia à rotina do pequeno.</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-white/70 backdrop-blur-xs p-3 rounded-xl border border-brand-blue-med/15 flex items-center gap-2.5">
                <span className="text-xl">👩‍🏫</span>
                <p className="text-[10px] text-brand-blue-dark leading-relaxed font-bold">
                  O Método ABC é simplificado, respeita a integridade sensorial e promove o desenvolvimento cognitivo sem estresse.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BENEFÍCIOS PARA A FAMÍLIA (EMOTIONAL CONNECTION) */}
      <section className="py-16 bg-slate-900 text-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <span className="text-brand-yellow font-extrabold text-xs uppercase tracking-widest block">Transformação em Casa</span>
            <h3 className="font-display font-black text-3xl leading-tight text-white">
              A Alegria de Ver Seu Filho Evoluir no Próprio Ritmo
            </h3>
            <p className="text-slate-405 text-slate-400 text-sm leading-relaxed">
              Ver o próprio filho identificar objetos sozinhos e ganhar autonomia de comunicação é a maior conquista que uma família pode vivenciar. Cada pequena folha concluída é um degrau rumo à independência de ler e escrever.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50">
              <div className="text-2xl mb-1 text-brand-green font-bold">✓</div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">Reconhecer Palavras Sozinho</h4>
              <p className="text-slate-400 text-xs">Vê-lo apontar na rua para placas ou brinquedos identificando letras com enorme facilidade.</p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50">
              <div className="text-2xl mb-1 text-brand-green font-bold">✓</div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">Mais Autoconfiança</h4>
              <p className="text-slate-400 text-xs">A criança reduz a timidez ao perceber que consegue realizar as tarefas de maneira independente.</p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50">
              <div className="text-2xl mb-1 text-brand-green font-bold">✓</div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">Aproximação em Família</h4>
              <p className="text-slate-400 text-xs">Momentos divertidos de união e brincadeiras sem estresse, choro ou ansiedade pedagógica.</p>
            </div>

            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50">
              <div className="text-2xl mb-1 text-brand-green font-bold">✓</div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">Autonomia Ampliada</h4>
              <p className="text-slate-400 text-xs">Diz respeito a expressar necessidades do dia a dia por meio de símbolos visuais reforçados.</p>
            </div>

          </div>

        </div>
      </section>

      {/* METODO VISUAL SPOTLIGHT SECTION WITH IMAGE */}
      <section className="py-16 md:py-24 px-6 bg-white border-y border-brand-blue-med/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-blue-med/10 rounded-full blur-3xl -z-10 transform scale-110"></div>
              <div className="border-8 border-white bg-white rounded-3xl overflow-hidden shadow-2xl transition duration-300 hover:scale-[1.02]">
                <img
                  src={heroImage}
                  alt="Cartaz do Método ABC"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6 text-left">
            <span className="bg-brand-blue-med/15 text-brand-blue-dark border border-brand-blue-med/25 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
              Metodologia de Alta Eficácia
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-blue-dark tracking-tight leading-tight">
              O Método ABC com Estímulo Visual e Foco Sensorial
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Como ilustrado em nosso material oficial, cada página do kit foi projetada meticulosamente para eliminar ruídos e facilitar a fixação da atenção. Ao aliar grandes letras legíveis a animais fofos com correspondência fonética direta, as barreiras de ansiedade dão lugar a um progresso leve, rápido e contínuo.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <span className="text-2xl mt-0.5">🎨</span>
                <div>
                  <h4 className="text-sm font-bold text-brand-blue-dark">Estética Calibrada e Limpa</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Layouts sem distrações desnecessárias ou excesso de estampas complexas, focando apenas na recompensa cognitiva direta e no progresso suave.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-2xl mt-0.5">🐝</span>
                <div>
                  <h4 className="text-sm font-bold text-brand-blue-dark">Pareamento Fônico de Alta Conformidade</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Associações táteis e sonoras instantâneas que estimulam canais de linguagem verbal e reflexos lógicos essenciais para a neurodiversidade.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => triggerCheckout('Completo')}
                className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange/95 text-white font-bold px-6 py-3 rounded-xl text-xs transition duration-300 transform active:scale-95 shadow-lg shadow-brand-orange/15 cursor-pointer text-center"
              >
                Garantir Material de Estudo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* REAL DIGITAL BUNDLE PRODUCTS GRID & ACCESS OFFERS */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="bg-brand-blue-med/15 text-brand-blue-dark border border-brand-blue-med/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Pacote de Sucesso do Aluno
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-blue-dark mt-3 tracking-tight">
              O Que Você Recebe No Acesso Imediato
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-2">
              Todo o nosso catálogo consagrado em PDF, empacotado para início imediato sem mensalidades adicionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1 */}
            <div className="bg-white border border-slate-150 p-5 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">📚</div>
                <h4 className="font-display font-bold text-slate-850 text-sm mb-1">Abecedário Visual</h4>
                <p className="text-xs text-slate-450 leading-relaxed">
                  Associação rápida de fonemas com animais fofos. Eliminando confusão fonética secundária.
                </p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-[10px] text-slate-500 font-bold mt-4">
                45 Atividades Prontas
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white border border-slate-150 p-5 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">🧩</div>
                <h4 className="font-display font-bold text-slate-850 text-sm mb-1">Silabário e Pareamento</h4>
                <p className="text-xs text-slate-450 leading-relaxed">
                  Montagem física de palavras comuns recortáveis. Foco em estímulo tátil de coordenação.
                </p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-[10px] text-slate-500 font-bold mt-4">
                60 Páginas Didáticas
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white border border-slate-150 p-5 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">✍️</div>
                <h4 className="font-display font-bold text-slate-850 text-sm mb-1">Coordenação Fina</h4>
                <p className="text-xs text-slate-450 leading-relaxed">
                  Tracejados progressivos com demarcações cromáticas para segurar o lápis e desenhar retas.
                </p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-[10px] text-slate-500 font-bold mt-4">
                30 Exercícios Extras
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white border border-slate-150 p-5 rounded-2xl relative flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-3">💡</div>
                <h4 className="font-display font-bold text-slate-850 text-sm mb-1">Guia Exclusivo Pais</h4>
                <p className="text-xs text-slate-450 leading-relaxed">
                  Manual com dicas diretas para diminuir a resistência e estruturar rotina de 10 min por dia.
                </p>
              </div>
              <div className="bg-brand-green/15 text-brand-green p-2 rounded-lg text-[10px] font-bold mt-4">
                Incluso Grátis de Brinde!
              </div>
            </div>

          </div>

          {/* Pricing Hot-offer Box */}
          <div className="bg-gradient-to-br from-brand-blue-dark via-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 mt-12 block relative overflow-hidden border border-slate-800 shadow-xl max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-blue-med/10 rounded-full blur-2xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 space-y-4 text-left">
                <span className="bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">
                  Aproveite a Promoção Semanal
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                  Método ABC - Alfabetização TEA
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">✓ Todo o Material em formato Digital PDF</li>
                  <li className="flex items-center gap-1.5">✓ Sem mensalidades ou taxas de manutenção</li>
                  <li className="flex items-center gap-1.5">✓ Liberação no e-mail um segundo após autorização</li>
                  <li className="flex items-center gap-1.5">✓ Garantia do Desenvolvedor de 7 Dias Correntes</li>
                </ul>
              </div>

              <div className="md:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xs text-slate-400 line-through">De R$ 197,00</span>
                <span className="text-3xl font-extrabold text-white mt-1">R$ 27,00</span>
                <span className="text-[10px] text-brand-green font-bold block mt-1 uppercase">Pagamento Único</span>
                
                <button
                  onClick={() => triggerCheckout('Completo')}
                  className="w-full mt-4 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-lg shadow-brand-orange/20 cursor-pointer"
                >
                  [QUERO AJUDAR MEU FILHO]
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center items-center gap-6 flex-wrap text-slate-400 text-[11px]">
              <span className="flex items-center gap-1">🔒 Cartões Criptografados</span>
              <span className="flex items-center gap-1">🔒 Chave Pix Oficial</span>
              <span className="flex items-center gap-1">🛡️ Reembolso Rápido</span>
            </div>
          </div>

        </div>
      </section>

      {/* PARENT & THERAPIST TESTIMONIALS */}
      <section className="py-16 md:py-24 px-6 bg-slate-100 text-slate-850">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-brand-purple text-xs font-bold uppercase tracking-wider bg-brand-purple/10 px-3 py-1 rounded-full">
              Histórias de Amor e Sucesso
            </span>
            <h2 className="font-display font-black text-3xl text-brand-blue-dark mt-3 tracking-tight">
              Famílias Que Sentiram a Mudança na Pele
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Veja as declarações sinceras de quem já ensinou ou usou em consultório de apoio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((col) => (
              <div key={col.id} className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-amber-500 mb-3">
                    {[...Array(col.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-655 text-slate-600 leading-relaxed italic mb-4">
                    "{col.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className={`w-9 h-9 rounded-full ${col.avatarColor} text-white font-extrabold flex items-center justify-center text-xs`}>
                    {col.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-blue-dark">{col.name}</h5>
                    <p className="text-[10px] text-slate-450">{col.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SYSTEMATIC COLLAPSIBLE FAQ ACCORDION */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="bg-brand-blue-med/15 text-brand-blue-dark border border-brand-blue-med/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Esclareça Suas Dúvidas
            </span>
            <h2 className="font-display font-black text-3xl text-brand-blue-dark mt-3 tracking-tight">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 hover:text-slate-950 text-sm md:text-base cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-[250px] border-t border-slate-200/40 p-5 bg-white' : 'max-h-0'
                    }`}
                  >
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER & TRUST BANNER */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-display font-black text-white text-sm tracking-wide">
                Alfabetização Adaptada Autismo
              </p>
              <p className="text-[10px] text-slate-500">Desenvolvimento com afeto, respeito e ciência visual.</p>
            </div>
          </div>

          <div className="text-xs text-center md:text-right space-y-1 text-slate-500">
            <p>© 2026 Alfabetização TEA. Todos os direitos reservados.</p>
            <p className="text-[10px]">As marcas e conceitos descritos são pedagógicos. Reconsultar seu neuropediatra para rotinas clínicas dedicadas.</p>
          </div>

        </div>
      </footer>

      {/* SINGLE CHECKOUT CONTROLLER MODAL */}
      <CheckoutSimulator
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        planType={selectedPlan}
      />

    </div>
  );
}
