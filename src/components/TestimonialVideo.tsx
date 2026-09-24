import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Link2, Check, ExternalLink } from 'lucide-react';
// @ts-ignore
import posterImg from '../assets/images/depoimento_mae_filho_1790190217339.jpg';

interface TestimonialVideoProps {
  className?: string;
  initialVideoUrl?: string;
}

function parseVideoSource(url: string): { type: 'youtube' | 'vimeo' | 'direct'; url: string } {
  if (!url || url.trim() === '') {
    return { type: 'direct', url: '/depoimento.mp4' };
  }
  const trimmed = url.trim();

  // YouTube Shorts: youtube.com/shorts/ID
  const ytShortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (ytShortsMatch) {
    return { type: 'youtube', url: `https://www.youtube.com/embed/${ytShortsMatch[1]}?autoplay=1&rel=0` };
  }

  // Regular YouTube: youtube.com/watch?v=ID or youtu.be/ID or youtube.com/embed/ID
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return { type: 'youtube', url: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0` };
  }

  // Vimeo: vimeo.com/ID
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) {
    return { type: 'vimeo', url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1` };
  }

  return { type: 'direct', url: trimmed };
}

export default function TestimonialVideo({ className = '', initialVideoUrl = '' }: TestimonialVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    return initialVideoUrl || localStorage.getItem('metodo_abc_testimonial_video') || '/depoimento.mp4';
  });
  const [inputUrl, setInputUrl] = useState<string>('');
  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const parsed = parseVideoSource(videoUrl);

  useEffect(() => {
    if (initialVideoUrl) {
      setVideoUrl(initialVideoUrl);
      localStorage.setItem('metodo_abc_testimonial_video', initialVideoUrl);
    }
  }, [initialVideoUrl]);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const cleanUrl = inputUrl.trim();
    setVideoUrl(cleanUrl);
    localStorage.setItem('metodo_abc_testimonial_video', cleanUrl);
    setShowInputModal(false);
    setInputUrl('');
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  const handleResetDefault = () => {
    setVideoUrl('/depoimento.mp4');
    localStorage.removeItem('metodo_abc_testimonial_video');
    setShowInputModal(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
        }
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = Math.max(0, Math.min(1, clickX / width));
    videoRef.current.currentTime = newProgress * (videoRef.current.duration || 1);
    setProgress(newProgress * 100);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className={`relative max-w-sm mx-auto group ${className}`}>
      {/* Decorative ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 via-brand-purple/20 to-brand-blue-med/20 rounded-3xl blur-2xl -z-10 transform scale-105"></div>

      {/* Video Container Styled like a modern vertical reel/story player */}
      <div 
        className="relative bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none aspect-[9/16] flex items-center justify-center"
      >
        {parsed.type === 'youtube' || parsed.type === 'vimeo' ? (
          <iframe
            src={parsed.url}
            title="Vídeo de Depoimento - Método ABC"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover border-0"
          />
        ) : (
          <div 
            onClick={togglePlay}
            className="w-full h-full cursor-pointer relative flex items-center justify-center"
          >
            <video
              ref={videoRef}
              src={parsed.url}
              poster={posterImg}
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Live / Video Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Depoimento Real</span>
            </div>

            {/* Big Central Play Button (When Paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-brand-orange to-amber-400 text-white flex items-center justify-center shadow-xl shadow-brand-orange/40 transform group-hover:scale-110 transition duration-300">
                  <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
                </div>
                <p className="text-white text-xs sm:text-sm font-bold mt-4 drop-shadow-md bg-black/40 px-3.5 py-1 rounded-full border border-white/20">
                  Clique para assistir ao vídeo
                </p>
              </div>
            )}

            {/* Bottom controls overlay */}
            <div 
              className={`absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 transition-opacity duration-300 ${
                isPlaying ? 'opacity-90 hover:opacity-100' : 'opacity-100'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtitle / Quote highlight */}
              <div className="mb-3">
                <p className="text-xs sm:text-[13px] text-white/95 font-medium leading-relaxed drop-shadow-sm">
                  &ldquo;Essas atividades tornaram a alfabetização muito mais leve e divertida aqui em casa!&rdquo;
                </p>
                <span className="text-[11px] text-brand-orange font-bold uppercase tracking-wider">
                  Mãe do Theo, 5 anos • Kit ABC Adaptado
                </span>
              </div>

              {/* Interactive timeline progress bar */}
              <div 
                onClick={handleSeek}
                className="w-full h-1.5 bg-white/25 hover:h-2.5 rounded-full cursor-pointer overflow-hidden transition-all mb-3 relative"
              >
                <div 
                  className="h-full bg-gradient-to-r from-brand-orange to-brand-coral transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Bar Buttons */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={togglePlay}
                    className="hover:text-brand-orange transition p-1 cursor-pointer"
                    title={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button 
                    type="button"
                    onClick={handleRestart}
                    className="hover:text-brand-orange transition p-1 cursor-pointer"
                    title="Reiniciar vídeo"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button 
                    type="button"
                    onClick={toggleMute}
                    className="hover:text-brand-orange transition p-1 cursor-pointer flex items-center gap-1"
                    title={isMuted ? "Ativar som" : "Desativar som"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span className="text-[10px] opacity-75">{isMuted ? 'Mudo' : 'Som'}</span>
                  </button>
                </div>

                <button 
                  type="button"
                  onClick={handleFullscreen}
                  className="hover:text-brand-orange transition p-1 cursor-pointer"
                  title="Tela cheia"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Direct link insertion helper */}
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={() => setShowInputModal(!showInputModal)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue-med font-medium py-1 px-3 rounded-lg hover:bg-slate-100 transition cursor-pointer"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>{showInputModal ? "Fechar configuração do link" : "Trocar link do vídeo"}</span>
        </button>

        {copiedSuccess && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold ml-2">
            <Check className="w-3.5 h-3.5" /> Vídeo atualizado!
          </span>
        )}
      </div>

      {/* Expandable Link Input Modal */}
      {showInputModal && (
        <div className="mt-3 p-4 bg-white rounded-2xl border border-brand-blue-med/20 shadow-xl text-left animate-in fade-in duration-200">
          <p className="text-xs font-bold text-brand-blue-dark mb-1">
            Cole aqui o link do vídeo:
          </p>
          <p className="text-[11px] text-slate-500 mb-3">
            Compatível com links do <strong>YouTube</strong> (vídeos e Shorts), <strong>Vimeo</strong> ou link direto <strong>MP4</strong>.
          </p>

          <form onSubmit={handleSaveUrl} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... ou .mp4"
                className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-blue-med"
              />
              <button
                type="submit"
                className="bg-brand-blue-med hover:bg-brand-blue-dark text-white font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer"
              >
                Salvar
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
              >
                Restaurar vídeo padrão
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
