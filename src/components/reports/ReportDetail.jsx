import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { BloodSplatter, Stamp, CreepySketch } from '../Visuals';

export function ReportDetail({ report, onBack }) {
  const isMedical = report.type === 'medical';

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft size={20} /> Retour aux archives
      </button>

      {isMedical ? (
        // TEMPLATE MÉDICAL CLASSÉ X
        <div className="relative bg-medical-paper text-black folder-border p-4 sm:p-8 md:p-16 min-h-[500px] md:min-h-[800px] overflow-hidden flex flex-col">
          {/* Blood Splatters */}
          <BloodSplatter className="-top-20 -left-20 w-64 h-64 opacity-60" />
          <BloodSplatter className="bottom-10 -right-10 w-48 h-48 opacity-40 rotate-180" />
          
          {/* Header Dossier */}
          <div className="border-b-4 border-black pb-6 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10 flex-shrink-0">
            <div>
              <p className="font-medical text-red-800 font-bold tracking-widest text-sm mb-2">RÉPUBLIQUE // DÉPARTEMENT MÉDICAL // CLASSIFIÉ</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-medical font-bold text-red-900 border-r-4 border-red-900 pr-4">#{String(report.reportNumber).padStart(3, '0')}</span>
                <h1 className="font-medical text-3xl md:text-5xl font-bold uppercase tracking-tighter break-words flex-1">{report.title}</h1>
              </div>
            </div>
            <div className="text-left md:text-right font-medical text-xs md:text-sm font-bold border-2 border-black p-2 bg-white/50 min-w-[120px] md:min-w-[150px]">
              <p>DATE: {new Date(report.createdAt).toLocaleDateString('fr-FR')}</p>
              <p>ID: #{report.id.slice(0,8).toUpperCase()}</p>
            </div>
          </div>

          {/* Stamps */}
          {report.stamp && (
            <div className="absolute top-8 right-8 md:top-16 md:right-16 z-20 pointer-events-none">
              <Stamp text={report.stamp} rotation="15deg" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 font-medical text-lg leading-relaxed space-y-6 flex-1">
            {report.imageUrl && (
              <div className="w-full sm:w-64 md:w-80 sm:float-right sm:ml-6 mb-6 border-4 border-black p-2 bg-white transform rotate-1 sm:rotate-2 shadow-xl">
                <img src={report.imageUrl} alt="Preuve médicale" className="w-full h-auto filter contrast-125 grayscale" />
                <p className="text-center text-xs mt-2 font-bold uppercase">Fig 1. Annexe visuelle</p>
              </div>
            )}
            
            <div className="whitespace-pre-wrap text-black/90 break-words">
              {report.content}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 border-t-2 border-black/30 pt-4 font-medical text-xs font-bold text-center opacity-50 uppercase tracking-widest flex-shrink-0">
            Fin de transmission - Destruction recommandée après lecture
          </div>
        </div>
      ) : (
        // TEMPLATE NORMAL (Journal - Chaos Organique)
        <div className="relative bg-journal-paper text-[#1a1a1a] p-4 sm:p-8 md:p-16 min-h-[500px] md:min-h-[800px] shadow-2xl rounded-sm overflow-hidden flex flex-col">
          
          {/* Art Marginal & Taches Organiques */}
          <CreepySketch type="veins" className="top-0 left-0 w-64 h-full" />
          <CreepySketch type="eye" className="bottom-20 right-10 w-48 h-48 -rotate-12 opacity-30" />
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#3a110a] rounded-full blur-3xl opacity-20 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-black rounded-full blur-3xl opacity-10 mix-blend-multiply pointer-events-none"></div>
          <BloodSplatter className="top-1/4 right-0 w-64 h-64 opacity-20 mix-blend-color-burn rotate-45 text-[#3a110a] pointer-events-none" />

          {/* Stamps */}
          {report.stamp && (
            <div className="absolute top-12 right-12 md:top-24 md:right-24 z-20 pointer-events-none opacity-80 mix-blend-color-burn">
              <Stamp text={report.stamp} rotation="-25deg" />
            </div>
          )}
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-2 border-[#3a110a]/30 pb-4">
              <div className="flex items-baseline gap-4 w-full">
                <span className="font-journal-title text-2xl text-[#3a110a] opacity-80">#{String(report.reportNumber).padStart(3, '0')}</span>
                <h1 className="text-3xl md:text-5xl font-journal-title text-[#1a1a1a] -rotate-1 tracking-wider break-words flex-1 leading-tight">{report.title}</h1>
              </div>
              <span className="font-journal-title text-sm text-[#3a110a] opacity-60 mt-4 md:mt-0 whitespace-nowrap transform rotate-2">
                {new Date(report.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>

            <div className="font-journal relative flex-1">
              {report.imageUrl && (
                <div className="w-full sm:max-w-[280px] sm:float-left sm:mr-8 mb-8 rotate-[-1deg] sm:rotate-[-3deg] shadow-[5px_5px_15px_rgba(0,0,0,0.5)] border-8 border-[#d6c5b3] border-b-[24px]">
                  <img src={report.imageUrl} alt="Note visuelle" className="w-full h-auto filter sepia-[.5] contrast-125" />
                  <p className="font-journal-title text-center text-xs mt-2 opacity-70">Preuve...</p>
                </div>
              )}

              <div className="break-words leading-[1.6] md:leading-[1.8] text-[1.2rem] md:text-[1.8rem]">
                {report.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6 whitespace-pre-wrap" style={{
                    transform: `rotate(${Math.random() * 2 - 1}deg)`,
                    paddingLeft: `${Math.random() * 10}px`
                  }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
