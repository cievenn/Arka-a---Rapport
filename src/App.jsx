import React, { useState, useEffect } from 'react';
import { Fingerprint, PenTool } from 'lucide-react';

// Imports des composants
import { ReportList } from './components/reports/ReportList';
import { ReportDetail } from './components/reports/ReportDetail';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminCMS } from './components/admin/AdminCMS';

export default function App() {
  const [reports, setReports] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'read', 'admin_login', 'admin_cms'
  const [selectedReport, setSelectedReport] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch Reports
  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      
      // Tri chronologique pour attribuer les numéros (le plus vieux = #1)
      data.sort((a, b) => a.createdAt - b.createdAt);
      
      const reportsWithNumbers = data.map((report, index) => ({
        ...report,
        reportNumber: index + 1
      }));
      
      // Inversion pour affichage (du plus récent au plus ancien)
      setReports(reportsWithNumbers.reverse());
    } catch (error) {
      console.error("Erreur lors du chargement des rapports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const openReport = (report) => {
    setSelectedReport(report);
    setView('read');
  };

  const deleteReport = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      if (selectedReport?.id === id) setView('list');
      fetchReports(); // Refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 selection:bg-red-900 selection:text-white flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-black/80 border-b border-red-900/30 p-4 sticky top-0 z-50 backdrop-blur-sm flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('list')}
        >
          <div className="w-10 h-10 rounded-full bg-red-950 flex items-center justify-center border border-red-800 group-hover:bg-red-900 transition-colors">
            <span className="text-red-500 font-medical font-bold text-xl">C</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-medical tracking-widest text-red-50 uppercase">Archives Chinoike</h1>
            <p className="text-xs text-red-500/70 font-medical tracking-widest">Base de données classifiée</p>
          </div>
        </div>
        
        <button 
          onClick={() => setView(isAdmin ? 'admin_cms' : 'admin_login')}
          className={`p-2 rounded-md transition-colors ${isAdmin ? 'text-red-500 hover:bg-red-950' : 'text-gray-600 hover:text-gray-300 hover:bg-gray-800'}`}
          title="Accès Administrateur"
        >
          {isAdmin ? <PenTool size={20} /> : <Fingerprint size={20} />}
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {view === 'list' && (
          <ReportList reports={reports} onOpen={openReport} isAdmin={isAdmin} onDelete={deleteReport} />
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