import React, { useState, useRef, useEffect } from 'react';
import { History, Trash2, Clock, ChevronDown, FileDown } from 'lucide-react';
import type { HistoryItem } from '../types';

interface HistoryDropdownProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onDelete: (id: string, label: string) => void;
    onClear: () => void;
}

const HistoryDropdown: React.FC<HistoryDropdownProps> = ({ history, onSelect, onDelete, onClear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-soft mb-6 hover:border-primary-300 transition-all text-left"
            >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                    <History className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Data Storage</p>
                    <h3 className="text-sm font-bold text-slate-800">Riwayat Berita Acara</h3>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-xs font-bold">{history.length}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-[-18px] mb-6 bg-white border border-slate-200 rounded-b-2xl shadow-2xl max-h-60 overflow-auto scrollbar-hide py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1 flex justify-between items-center sticky top-0 bg-white z-10">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pilih Data Terakhir</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClear();
                            }}
                            className="text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest"
                        >
                            Hapus Semua
                        </button>
                    </div>
                    {history.length > 0 ? (
                        history.sort((a, b) => b.timestamp - a.timestamp).map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer group/item transition-colors"
                                onClick={() => {
                                    onSelect(item);
                                    setIsOpen(false);
                                }}
                            >
                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover/item:text-primary-500 group-hover/item:bg-primary-50 transition-colors">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-semibold text-slate-700 truncate">{item.label}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{new Date(item.timestamp).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                    <div className="p-2 text-primary-500 bg-primary-50 rounded-lg">
                                        <FileDown className="w-4 h-4" />
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(item.id, item.label);
                                        }}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center">
                            <p className="text-xs text-slate-400 font-medium italic">Tidak ada data tersimpan</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryDropdown;

