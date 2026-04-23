import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Fingerprint, PenTool } from 'lucide-react';

// Imports des composants
import { ReportList } from './components/reports/ReportList';
import { ReportDetail } from './components/reports/ReportDetail';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminCMS } from './components/admin/AdminCMS';

const SECRET_MEDICAL_PATH = "/medical-x7k9P2mZ-confidentiel";

function MainContent({ reports, fetchReports, isAdmin, setIsAdmin, user }) {
  const [view, setView] = useState('list'); // 'list', 'read', 'admin_login', 'admin_cms'
  const [selectedReport, setSelectedReport] = useState(null);
  const location = useLocation();
  
  // Déterminer le type de rapports à afficher selon l'URL
  const isMedicalView = location.pathname === SECRET_MEDICAL_PATH;
  const filteredReports = reports.filter(r => isMedicalView ? r.type === 'medical' : r.type === 'normal');

  useEffect(() => {
    setView('list');
  }, [location.pathname]);

  const openReport = (report) => {
    setSelectedReport(report);
    setView('read');
  };

  const deleteReport = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      if (selectedReport?.id === id) setView('list');
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen ${isMedicalView ? 'bg-[#0a0505]' : 'bg-[#111]'} text-gray-200 selection:bg-red-900 selection:text-white flex flex-col font-sans transition-colors duration-500`}>
      {/* HEADER */}
      <header className={`bg-black/80 border-b ${isMedicalView ? 'border-red-600/50 shadow-[0_0_20px_rgba(139,0,0,0.2)]' : 'border-red-900/30'} p-4 sticky top-0 z-50 backdrop-blur-sm flex justify-between items-center`}>
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('list')}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${isMedicalView ? 'bg-red-900 border-red-500 group-hover:bg-red-700' : 'bg-red-950 border-red-800 group-hover:bg-red-900'}`}>
            <span className="text-red-500 font-medical font-bold text-xl">{isMedicalView ? 'X' : 'C'}</span>
          </div>
          <div>
            <h1 className={`text-lg md:text-xl font-medical tracking-widest text-red-50 uppercase ${isMedicalView ? 'animate-pulse' : ''}`}>
              {isMedicalView ? 'Archives Classifiées' : 'Journal d\'Arkaïa'}
            </h1>
            <p className="text-xs text-red-500/70 font-medical tracking-widest">
              {isMedicalView ? 'ACCÈS RESTREINT - NIVEAU 5' : 'Base de données publique'}
            </p>
          </div>
        </div>
        
        {/* On ne montre le bouton admin que si on est sur la page médicale secrète ou si on est déjà admin */}
        {(isMedicalView || isAdmin) && (
          <button 
            onClick={() => setView(isAdmin ? 'admin_cms' : 'admin_login')}
            className={`p-2 rounded-md transition-colors ${isAdmin ? 'text-red-500 hover:bg-red-950' : 'text-gray-600 hover:text-gray-300 hover:bg-gray-800'}`}
            title="Accès Administrateur"
          >
            {isAdmin ? <PenTool size={20} /> : <Fingerprint size={20} />}
          </button>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {view === 'list' && (
          <ReportList reports={filteredReports} onOpen={openReport} isAdmin={isAdmin} onDelete={deleteReport} />
        )}
        {view === 'read' && selectedReport && (
          <ReportDetail report={selectedReport} onBack={() => setView('list')} />
        )}
        {view === 'admin_login' && (
          <AdminLogin onLogin={() => { setIsAdmin(true); setView('admin_cms'); }} onCancel={() => setView('list')} />
        )}
        {view === 'admin_cms' && (
          <AdminCMS onBack={() => { setView('list'); fetchReports(); }} />
        )}
      </main>
    </div>
  );
}

export default function App() {
  const [reports, setReports] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      data.sort((a, b) => a.createdAt - b.createdAt);
      const reportsWithNumbers = data.map((report, index) => ({
        ...report,
        reportNumber: index + 1
      }));
      setReports(reportsWithNumbers.reverse());
    } catch (error) {
      console.error("Erreur chargement rapports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent reports={reports} fetchReports={fetchReports} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
        <Route path={SECRET_MEDICAL_PATH} element={<MainContent reports={reports} fetchReports={fetchReports} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
        {/* Rediriger tout le reste vers l'accueil journal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}