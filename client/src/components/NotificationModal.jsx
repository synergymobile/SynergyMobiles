import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const NotificationModal = ({ isOpen, onClose, type = 'success', title, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const styles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      icon: <CheckCircle className="w-12 h-12 text-emerald-500 mb-4" />,
      titleColor: 'text-emerald-900',
      button: 'bg-emerald-500 hover:bg-emerald-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      icon: <XCircle className="w-12 h-12 text-red-500 mb-4" />,
      titleColor: 'text-red-900',
      button: 'bg-red-500 hover:bg-red-600',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      icon: <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />,
      titleColor: 'text-amber-900',
      button: 'bg-amber-500 hover:bg-amber-600',
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative w-full max-w-sm p-8 rounded-3xl shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-200 ${currentStyle.bg} border ${currentStyle.border}`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>

        <div className="flex flex-col items-center text-center">
          {currentStyle.icon}
          
          <h3 className={`text-xl font-black mb-2 ${currentStyle.titleColor}`}>
            {title}
          </h3>
          
          <p className="text-slate-600 font-medium mb-6">
            {message}
          </p>

          <button
            onClick={onClose}
            className={`w-full py-3 px-6 rounded-xl text-white font-bold shadow-lg shadow-black/5 transform active:scale-95 transition-all ${currentStyle.button}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
