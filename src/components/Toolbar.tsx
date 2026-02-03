import React from 'react';
import { Download, Save, History, FileText, Share2 } from 'lucide-react';

interface ToolbarProps {
    onDownload: () => void;
    onSave: () => void;
    activeView: 'form' | 'preview';
}

const Toolbar: React.FC<ToolbarProps> = ({ onDownload, onSave, activeView }) => {
    return (
        <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-40 md:relative md:border-t-0 md:border-b md:bg-transparent md:p-0 md:mb-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Preview Actions</span>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                        onClick={onSave}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-primary-300 transition-all shadow-sm"
                    >
                        <Save className="w-4 h-4 text-primary-500" />
                        Simpan Data
                    </button>

                    <button
                        onClick={onDownload}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 rounded-2xl text-sm font-bold text-white hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                    >
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toolbar;
