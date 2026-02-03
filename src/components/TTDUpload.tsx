import React, { useRef, useState } from 'react';
import { Upload, PenTool, Eraser, Image as ImageIcon } from 'lucide-react';

interface TTDUploadProps {
    onUpload: (dataUrl: string) => void;
    currentImage?: string;
}

const TTDUpload: React.FC<TTDUploadProps> = ({ onUpload, currentImage }) => {
    const [mode, setMode] = useState<'upload' | 'canvas'>('upload');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (e.cancelable) e.preventDefault();
        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
        const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (e.cancelable) e.preventDefault();
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
        const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const saveCanvas = () => {
        if (!canvasRef.current) return;
        onUpload(canvasRef.current.toDataURL());
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

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
            <div className="flex gap-2">
                <button
                    onClick={() => setMode('upload')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all ${mode === 'upload' ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                >
                    <Upload className="w-4 h-4" /> Upload Gambar
                </button>
                <button
                    onClick={() => setMode('canvas')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all ${mode === 'canvas' ? 'bg-primary-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                >
                    <PenTool className="w-4 h-4" /> Tanda Tangan
                </button>
            </div>

            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden min-h-[160px] relative">
                {mode === 'upload' ? (
                    <div className="flex flex-col items-center justify-center p-8 h-full">
                        {currentImage ? (
                            <div className="relative group">
                                <img src={currentImage} alt="TTD" className="max-h-32 object-contain" />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                    <button onClick={() => onUpload('')} className="bg-red-500 text-white p-2 rounded-full"><Eraser className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center">
                                <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
                                <span className="text-xs text-slate-500 font-medium tracking-tight">Klik untuk upload TTD</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                            </label>
                        )}
                    </div>
                ) : (
                    <div className="relative h-full bg-white">
                        <canvas
                            ref={canvasRef}
                            width={400}
                            height={160}
                            className="w-full cursor-crosshair touch-none"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={(e) => {
                                if (e.cancelable) e.preventDefault();
                                startDrawing(e);
                            }}
                            onTouchMove={(e) => {
                                if (e.cancelable) e.preventDefault();
                                draw(e);
                            }}
                            onTouchEnd={stopDrawing}
                        />
                        <div className="absolute bottom-2 right-2 flex gap-2">
                            <button
                                onClick={clearCanvas}
                                className="bg-slate-100 text-slate-600 p-2 rounded-xl hover:bg-slate-200"
                                title="Hapus"
                            >
                                <Eraser className="w-4 h-4" />
                            </button>
                            <button
                                onClick={saveCanvas}
                                className="bg-primary-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-primary-700"
                            >
                                Gunakan
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TTDUpload;
