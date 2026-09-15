import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, CreditCard, QrCode, ClipboardCheck, Clipboard, Download, CheckCircle, Sparkles, X, HeartHandshake, AlertCircle } from 'lucide-react';

interface CheckoutSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  planType: string;
}

export default function CheckoutSimulator({ isOpen, onClose, planType }: CheckoutSimulatorProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [timerCount, setTimerCount] = useState(600); // 10 minutes for Pix

  useEffect(() => {
    if (!isOpen || paymentMethod !== 'pix' || isSuccess) return;
    const interval = setInterval(() => {
      setTimerCount((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paymentMethod, isSuccess]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136alfabetizacaotea-pix-key-static-studios1948502573295823123512");
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert("Por favor, preencha todos os campos do cartão.");
      return;
    }
    simulatePayment();
  };

  const simulatePayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg border border-slate-100 relative z-10 mx-auto"
          >
            {/* Header / Brand */}
            <div className="bg-gradient-to-r from-brand-pink to-brand-red text-white p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-2 mb-1">
                <HeartHandshake className="w-5 h-5 text-rose-200" />
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-rose-100">
                  Compra Segura
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold font-sans">
                {isSuccess ? "🎉 Acesso Liberado!" : "Concluir seu Acesso"}
              </h3>
              <p className="text-xs text-rose-100/90 mt-1">
                {isSuccess 
                  ? "Seu material de Alfabetização TEA já está disponível para download imediato abaixo!" 
                  : `Você está adquirindo o Método ABC (${planType || "Completo"}) com desconto exclusivo.`}
              </p>
            </div>

            {/* Content area */}
            <div className="p-6">
              {!isSuccess ? (
                <>
                  {/* Prices & Safe Badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <span className="text-xs text-slate-400 block line-through">De R$ 197,00</span>
                      <span className="text-2xl font-black text-slate-800">
                        R$ 27,00 <span className="text-xs font-semibold text-brand-green font-sans">Apenas</span>
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-brand-green fill-brand-green/10" /> Site Protegido
                      </span>
                      <span className="text-[10px] text-slate-450 mt-0.5">SSL Dinâmico de 256 bits</span>
                    </div>
                  </div>

                  {/* Payment Methods Tabs */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                        paymentMethod === 'pix'
                          ? 'bg-white text-brand-pink shadow-sm border border-slate-100'
                          : 'text-slate-500 hover:text-slate-850'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-brand-green" />
                      <span>Pagar via Pix</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-white text-brand-pink shadow-sm border border-slate-100'
                          : 'text-slate-500 hover:text-slate-850'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-brand-pink" />
                      <span>Cartão de Crédito</span>
                    </button>
                  </div>

                  {/* Payment form contents */}
                  {paymentMethod === 'pix' ? (
                    <div className="space-y-4 flex flex-col items-center">
                      <div className="bg-brand-green/10 rounded-2xl p-4 border border-brand-green/20 flex items-center gap-3 w-full">
                        <div className="bg-brand-green/15 p-2.5 rounded-xl text-brand-green">
                          <QrCode className="w-6 h-6" />
                        </div>
                        <div className="text-xs text-brand-green">
                          <p className="font-bold">Liberação Imediata!</p>
                          <p className="text-emerald-800 leading-relaxed text-[11px]">O material é enviado para seu e-mail no mesmo segundo da confirmação do Pix.</p>
                        </div>
                      </div>

                      {/* Mock QR Code representation */}
                      <div className="relative bg-slate-105 border-4 border-slate-50 p-3 bg-white shadow-inner rounded-xl w-44 h-44 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-brand-green/5 rounded-lg"></div>
                        
                        {/* Interactive QR box illustration */}
                        <div className="w-full h-full relative border border-slate-150 rounded flex flex-col items-center justify-center p-2">
                          <QrCode className="w-24 h-24 text-slate-700 opacity-90" />
                          <div className="text-[10px] bg-slate-800 text-white font-mono px-2 py-0.5 rounded mt-2">
                            {formatTimer(timerCount)}
                          </div>
                        </div>
                      </div>

                      {/* Pix Key copy paste container */}
                      <div className="w-full space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block text-center">
                          Chave Pix (Copia e Cola):
                        </label>
                        <div className="flex bg-slate-50 rounded-xl border border-slate-150 p-1.5 items-center justify-between">
                          <code className="text-xs text-slate-600 font-mono select-all truncate pl-2 max-w-[280px]">
                            00020126580014BR.GOV.BCB.PIX0136alfabetizacaotea-pix-key-static
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyPix}
                            className={`flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                              copiedPix 
                                ? 'bg-brand-green text-white' 
                                : 'bg-slate-805 hover:bg-slate-900 text-white'
                            }`}
                          >
                            {copiedPix ? (
                              <>Copiado <ClipboardCheck className="w-3.5 h-3.5" /></>
                            ) : (
                              <>Copiar <Clipboard className="w-3.5 h-3.5" /></>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Manual Confirmation simulation button */}
                      <button
                        type="button"
                        onClick={simulatePayment}
                        disabled={isSubmitting}
                        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-brand-red/10 active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {isSubmitting ? (
                          <>Confirmando cadastro...</>
                        ) : (
                          <>Já realizei o Pix! Simular Aprovação</>
                        )}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCardSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">Nome impresso no Cartão</label>
                        <input
                          type="text"
                          required
                          placeholder="MÔNICA A CORREIA"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-205 focus:border-brand-pink focus:bg-white rounded-xl px-3 py-2.5 text-sm transition outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">Número do Cartão</label>
                        <input
                          type="text"
                          required
                          placeholder="4444 •••• •••• 1234"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-205 focus:border-brand-pink focus:bg-white rounded-xl px-3 py-2.5 text-sm transition outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">Validade</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/AA"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-205 focus:border-brand-pink focus:bg-white rounded-xl px-3 py-2.5 text-sm transition outline-none text-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500">CVV</label>
                          <input
                            type="password"
                            required
                            placeholder="•••"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-205 focus:border-brand-pink focus:bg-white rounded-xl px-3 py-2.5 text-sm transition outline-none text-center"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-brand-red/10 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        {isSubmitting ? (
                          <>Aprovando cartão...</>
                        ) : (
                          <>Pagar R$ 27,00 e Acessar Agora</>
                        )}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                /* SUCCESS STATE: Parent receives high fidelity sample downloads representing the product PDF bundles */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5 text-center py-2"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto flex items-center justify-center border border-emerald-100 mb-2">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-800">
                    Sua compra foi aprovada!
                  </h4>
                  
                  <p className="text-xs text-slate-450 max-w-sm mx-auto">
                    Parabéns por investir no desenvolvimento do seu filho. Clique nos botões abaixo para fazer o download dos materiais do pacote completo.
                  </p>

                  <div className="space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-2">Seus Cadernos Prontos (PDF):</p>
                    
                    {/* Real high quality mock PDF document access */}
                    <a
                      href="https://picsum.photos/seed/doc1/1000/1500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition shadow-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">📚</span>
                        <div>
                          <p className="text-xs font-bold text-slate-700 group-hover:text-brand-pink">Volume 1 - Alfabeto Visual TEA.pdf</p>
                          <p className="text-[10px] text-slate-400">45 páginas • Atividades de Pareamento</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-brand-pink" />
                    </a>

                    <a
                      href="https://picsum.photos/seed/doc2/1000/1500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition shadow-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🧩</span>
                        <div>
                          <p className="text-xs font-bold text-slate-700 group-hover:text-brand-pink">Volume 2 - Silabário e Palavras.pdf</p>
                          <p className="text-[10px] text-slate-400">60 páginas • Formação Fônica</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-brand-pink" />
                    </a>

                    <a
                      href="https://picsum.photos/seed/doc3/1000/1500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition shadow-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">✍️</span>
                        <div>
                          <p className="text-xs font-bold text-slate-700 group-hover:text-brand-pink">Volume 3 - Coordenação Fina.pdf</p>
                          <p className="text-[10px] text-slate-400">30 páginas • Pontilhados Amigáveis</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-brand-pink" />
                    </a>

                    <a
                      href="https://picsum.photos/seed/doc4/1000/1500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition shadow-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">💡</span>
                        <div>
                          <p className="text-xs font-bold text-slate-700 group-hover:text-brand-pink">Guia de Apoio para Pais e Tutores.pdf</p>
                          <p className="text-[10px] text-slate-400">20 páginas • Técnicas Anti-frustração</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-brand-pink" />
                    </a>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-2">
                    Enviamos uma cópia adicional com senhas de acesso exclusivas para o e-mail cadastrado.
                  </p>

                  <button
                    onClick={onClose}
                    className="mt-2 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer"
                  >
                    Voltar para a Página Principal
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
