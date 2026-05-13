import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface QuetzalTipFloatingProps {
  isVisible: boolean;
  onClose: () => void;
}

export function QuetzalTipFloating({ isVisible, onClose }: QuetzalTipFloatingProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Delay de 2.5s antes de aparecer
    const showTimer = setTimeout(() => {
      setIsShowing(true);
      setIsFading(false);
    }, 1500);

    // Fade out comienza 500ms antes del cierre (2500 + 14500 = 17000ms)
    const fadeTimer = setTimeout(() => {
    setIsFading(true);
    }, 17000);

    // Cierra completamente (2500 + 15000 = 17500ms)
    const closeTimer = setTimeout(() => {
    setIsShowing(false);
    onClose();
    }, 17500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [isVisible, onClose]);

  if (!isShowing) return null;

  return (
    <div
      className={`fixed right-6 top-1/2 z-50 bg-transparent transition-all duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        transform: isFading
          ? 'translateY(-50%) translateX(16px)'
          : 'translateY(-50%) translateX(0)',
        transition: 'opacity 500ms, transform 500ms',
      }}
    >
      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }
        .quetzal-enter {
          animation: slideInFromRight 350ms ease-out;
        }
        /* Cola apuntando hacia la DERECHA (hacia el quetzal) */
        .speech-bubble-right::after {
          content: '';
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 12px solid white;
        }
      `}</style>

      {/* Bubble a la izquierda, quetzal a la derecha */}
      <div className="quetzal-enter flex items-center gap-3">

        {/* Speech bubble */}
        <div className="speech-bubble-right relative bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 max-w-[260px]">
            <p className="text-base font-semibold text-gray-800 flex-1 leading-snug">
            ¡Escribe una categoría + la palabra{' '}
            <span className="text-[#4997D0]">completo</span>
            <span className="text-[#4997D0]">!</span>{' '}
            <br />
            <span className="font-normal text-sm text-gray-500">Ej: animales completo</span>
            </p>
          <button
            onClick={() => { setIsShowing(false); onClose(); }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-1"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quetzal sin wrapper */}
        <img
          src="/quetzal.png"
          alt="Quetzal tip"
          className="w-24 h-24 object-contain flex-shrink-0 drop-shadow-md"
        />
      </div>
    </div>
  );
}