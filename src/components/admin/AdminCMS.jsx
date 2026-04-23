import React, { useState } from 'react';
import { PenTool, CheckCircle2, Image as ImageIcon, ShieldAlert } from 'lucide-react';

export function AdminCMS({ onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'medical',
    content: '',
    imageUrl: '',
    stamp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const stamps = [
    { value: '', label: 'Aucun' },
    { value: 'CONFIDENTIEL', label: 'Confidentiel' },
    { value: 'PROPRIÉTÉ DU CLAN CHINOIKE', label: 'Propriété du Clan' },
    { value: 'DANGER DE MORT', label: 'Danger de Mort' },
    { value: 'ARCHIVE MORTE', label: 'Archive Morte' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdAt: Date.now()
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onBack();
        }, 2000);
      } else {
        throw new Error("Erreur lors de la sauvegarde");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-black/40 border border-gray-800 rounded-lg p-6 md:p-8 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-medical text-red-500 font-bold uppercase tracking-widest flex items-center gap-3">
          <PenTool size={24} /> Rédaction de Rapport
        </h2>
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors">
          Fermer
        </button>
      </div>

      {success ? (
        <div className="flex flex-col items-center justify-center py-20 text-green-500 font-medical">
          <CheckCircle2 size={64} className="mb-4" />
          <h3 className="text-2xl">Rapport archivé avec succès</h3>
          <p className="text-gray-400 mt-2">Redirection en cours...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => setFormData({...formData, type: 'medical'})}
              className={`p-4 border rounded cursor-pointer transition-all ${formData.type === 'medical' ? 'border-red-600 bg-red-900/20 text-white' : 'border-gray-700 bg-black/50 text-gray-400 hover:border-gray-500'}`}
            >
              <h3 className="font-medical font-bold text-lg mb-1">Dossier Médical</h3>
              <p className="text-xs font-sans">Classé X, immersif, machine à écrire.</p>
            </div>
            <div 
              onClick={() => setFormData({...formData, type: 'normal'})}
              className={`p-4 border rounded cursor-pointer transition-all ${formData.type === 'normal' ? 'border-blue-600 bg-blue-900/20 text-white' : 'border-gray-700 bg-black/50 text-gray-400 hover:border-gray-500'}`}
            >
              <h3 className="font-sans font-bold text-lg mb-1">Journal / Notes</h3>
              <p className="text-xs font-sans">Style manuscrit, carnet de notes classique.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medical text-gray-400 mb-1">Titre du document</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-white focus:border-red-600 focus:outline-none font-sans"
                placeholder="Ex: Sujet #042 - Analyse Sanguine"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medical text-gray-400 mb-1 flex items-center gap-2">
                  <ImageIcon size={14}/> URL de l'image (Optionnel)
                </label>
                <input 
                  type="url" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-white focus:border-red-600 focus:outline-none font-sans text-sm"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medical text-gray-400 mb-1 flex items-center gap-2">
                  <ShieldAlert size={14}/> Tampon de Confidentialité
                </label>
                <select 
                  value={formData.stamp}
                  onChange={(e) => setFormData({...formData, stamp: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-white focus:border-red-600 focus:outline-none font-medical text-sm"
                >
                  {stamps.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medical text-gray-400 mb-1">Contenu du rapport</label>
              <textarea 
                required
                rows="12"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className={`w-full bg-gray-900 border border-gray-700 p-4 rounded text-white focus:border-red-600 focus:outline-none break-words
                  ${formData.type === 'medical' ? 'font-medical text-sm' : 'font-journal text-xl'}
                `}
                placeholder="Commencez la rédaction..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-800">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 bg-red-900 text-white rounded hover:bg-red-800 font-medical font-bold tracking-widest transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'ARCHIVAGE...' : 'ARCHIVER LE DOCUMENT'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
