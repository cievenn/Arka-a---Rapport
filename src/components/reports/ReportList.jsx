import React from 'react';
import { FileText, ShieldAlert, Trash2 } from 'lucide-react';
import { BloodSplatter, CreepySketch } from '../Visuals';

export function ReportList({ reports, onOpen, isAdmin, onDelete }) {
  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 font-medical">
        <FileText size={48} className="mb-4 opacity-50" />
        <p>Aucune archive trouvée dans la base de données.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <div 
          key={report.id}
          className={`relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(139,0,0,0.4)]
            ${report.type === 'medical' 
              ? 'bg-[#e3d5b8] border-l-8 border-[#1a1a1a] shadow-lg' 
              : 'bg-[#d6c5b3] border border-gray-600 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] shadow-xl'
            }
          `}
          onClick={() => onOpen(report)}
        >
          {/* Card Content */}
          <div className="p-6 h-48 flex flex-col relative z-10">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 font-sans">
                  #{String(report.reportNumber).padStart(3, '0')}
                </span>
                <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider
                  ${report.type === 'medical' ? 'bg-black text-red-500 font-medical' : 'bg-[#3a110a] text-[#d6c5b3] font-sans'}
                `}>
                  {report.type === 'medical' ? 'Dossier Médical' : 'Journal Intime'}
                </span>
              </div>
              {report.stamp && (
                <ShieldAlert size={16} className={report.type === 'medical' ? "text-red-700" : "text-[#3a110a] opacity-80"} />
              )}
            </div>
            
            <h3 className={`text-lg md:text-xl mb-2 line-clamp-2 text-black
              ${report.type === 'medical' ? 'font-medical font-bold' : 'font-journal-title font-bold text-2xl rotate-1'}
            `}>
              {report.title}
            </h3>
            
            <p className={`text-sm opacity-70 line-clamp-3 text-black leading-tight
              ${report.type === 'medical' ? 'font-medical' : 'font-journal text-xl'}
            `}>
              {report.content}
            </p>

            <div className="mt-auto pt-4 flex justify-between items-center text-black/50 text-xs">
              <span className={report.type === 'medical' ? "font-medical" : "font-sans italic"}>
                {new Date(report.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Admin Delete Button */}
          {isAdmin && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(report.id); }}
              className="absolute bottom-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-20"
              title="Supprimer le rapport"
            >
              <Trash2 size={14} />
            </button>
          )}

          {/* Decorative Backgrounds for Cards */}
          {report.type === 'medical' && (
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-30 mix-blend-multiply overflow-hidden z-0">
               <BloodSplatter className="-top-8 -right-8 w-24 h-24" />
            </div>
          )}
          {report.type === 'normal' && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 mix-blend-multiply overflow-hidden z-0">
               <CreepySketch type="eye" className="-bottom-10 -right-10 w-40 h-40 rotate-12" />
               <div className="absolute top-4 right-4 w-12 h-12 bg-[#3a110a] rounded-full blur-xl opacity-30"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
