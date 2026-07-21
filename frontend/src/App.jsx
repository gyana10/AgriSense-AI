import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FarmProvider } from './context/FarmContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import FloatingAssistant from './components/common/FloatingAssistant';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FarmProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#F8FAF7] dark:bg-[#101510] text-slate-900 dark:text-slate-100 transition-colors selection:bg-emerald-500 selection:text-white">
              <Navbar />
              <div className="flex flex-1 pt-20">
                <Sidebar />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                  <AppRoutes />
                </main>
              </div>
              <Footer />
              <FloatingAssistant />
            </div>
          </BrowserRouter>
        </FarmProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;