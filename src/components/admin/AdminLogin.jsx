import React, { useState } from 'react';
import { Lock, Fingerprint } from 'lucide-react';

export function AdminLogin({ onLogin, onCancel }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.toUpperCase() === 'CHINOIKE') {
      onLogin();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-black/50 border border-red-900/50 rounded-lg backdrop-blur-md">
      <div className="text-center mb-8">
        <Lock className="mx-auto mb-4 text-red-600" size={48} />
        <h2 className="text-2xl font-medical text-white mb-2">Accès Restreint</h2>
        <p className="text-gray-400 text-sm font-medical">Veuillez entrer le code d'autorisation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input 
            type="password" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={`w-full bg-black/80 border p-3 rounded text-center text-2xl tracking-widest font-medical focus:outline-none transition-colors
              ${error ? 'border-red-500 text-red-500' : 'border-gray-700 text-white focus:border-red-800'}
            `}
            placeholder="••••••••"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-2 text-center font-medical animate-pulse">Accès Refusé</p>}
        </div>
        
        <div className="flex gap-4 pt-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 font-medical transition-colors"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="flex-1 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-800 font-medical font-bold tracking-wider transition-colors"
          >
            Déverrouiller
          </button>
        </div>
      </form>
    </div>
  );
}
