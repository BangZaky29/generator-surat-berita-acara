import React from 'react';
import { Upload, X, ShieldCheck } from 'lucide-react';

interface StampUploadProps {
    onUpload: (dataUrl: string) => void;
    currentImage?: string;
}

const StampUpload: React.FC<StampUploadProps> = ({ onUpload, currentImage }) => {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpload(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-4">
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden min-h-[120px] relative">
                <div className="flex flex-col items-center justify-center p-6 h-full text-center">
                    {currentImage ? (
                        <div className="relative group">
                            <img src={currentImage} alt="Stempel" className="max-h-24 object-contain" />
                            <button
                                onClick={() => onUpload('')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center">
                            <ShieldCheck className="w-8 h-8 text-slate-300 mb-2" />
                            <div className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                                <Upload className="w-4 h-4 text-primary-600" />
                                <span className="text-xs text-slate-700 font-bold uppercase tracking-wider">Upload Stempel</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 italic font-medium">Opsional (Format PNG Transparan direkomendasikan)</p>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StampUpload;
