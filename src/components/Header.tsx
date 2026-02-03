import React from 'react';
import { FileText } from 'lucide-react';
import NSLogo from '../assets/NS_white_01.png';

const Header: React.FC = () => {
    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 overflow-hidden relative">
                        <img
                            src={NSLogo}
                            alt="NS Logo"
                            className="w-full h-full object-cover z-10"
                            onError={(e) => {
                                // Fallback to Icon if image fails to load
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <FileText className="w-6 h-6 text-white absolute hidden" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Berita Acara</h1>
                        <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1 tracking-wider text-primary-600">Nuansa Solution | Professional Generator</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Live Preview Engine v1.0</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
